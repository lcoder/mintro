/**
 * ;引导插件
 * Created by maotingfeng on 16/6/17.
 */
(function(factory){
    if( typeof define === "function" && define.cmd ){
        define( function(require,exports,module){
            factory( require("jquery") ) ;
        } ) ;
    }else if( typeof define === "function" && define.amd ){
        define( ['jquery'] , factory )
    }else if( window.jQuery ){
        window.mintro = factory( window.jQuery ) ;
    }else {
        throw new Error('mintro依赖jquery') ;
    }
})( function( $ ){
    var tool = {
        getNum: function( num ){
            if( isNaN( num ) ){
                num = parseInt( num ) ;
                return isNaN( num ) ? 0 : num ;
            }else{
                return $.trim( num ) == '' ? 0 : num ;
            }
        }
    }
    function mintro( config ){
        var defaultConfig = {
            stepClass: 'mintro_steps' ,
            firstStep: 0 ,
            steps: [] ,
            destroy: $.noop
        }
        $.extend( defaultConfig , config ) ;

        var $body = $("body") ,
            $window = $(window) ,
            steps = defaultConfig.steps ,
            firstStep = defaultConfig.firstStep ,
            destroyCallback = defaultConfig.destroy ,
            stepClass = defaultConfig.stepClass ;
        var operator = {
                prevStep: null ,
                getMaskEle: function(){
                    return $("#mintro_mask") ;
                } ,
                showMask: function(){
                    var $mintro_mask =  this.getMaskEle() ,
                        mask_html = '<div id="mintro_mask"></div>' ;
                    if( $mintro_mask.length > 0 ){
                        $mintro_mask.show() ;
                    }else{
                        $body.append( mask_html ) ;
                    }
                } ,
                resizePosition: function(){
                    $.each( steps , function( index , val ){
                        var $ele = val._$ele ;
                        if( $ele ){
                            operator.calcPosition( { $step_ele: $ele , target: val.element , diff: val.diff } )
                        }
                    } ) ;
                } ,
                calcPosition: function( config ){
                    var $step_ele = config.$step_ele ,
                        diff = config.diff ? config.diff : {} ,
                        $target = $( config.target ) ,
                        scroll_win = { top: $window.scrollTop() , left: $window.scrollLeft() } ,
                        target_offset = $target.offset() ,
                        target_box = { width: $target.outerWidth() , height: $target.outerHeight() } ;

                        if( $target.length > 0 ){
                            $step_ele.css( { top: ( target_offset.top - scroll_win.top + tool.getNum( diff.top ) ) ,
                                left: ( target_offset.left - scroll_win.left + tool.getNum( diff.left ) )
                            } ) ;
                        }
                } ,
                goToStep: function( index ){
                    if( index >= steps.length ){ return index == steps.length ? this.destroy() : '' ; }
                    var that = this ,
                        step = steps[ index ] ,
                        className = stepClass + ' ' + stepClass + index ,
                        wrapperHtml = '<div class="' + className +'">placeholder<a class="mintro_close" href="javascript:void(0);"></a><a class="mintro_next" href="javascript:void(0);"></a></div>' ,
                        html = wrapperHtml.replace(/placeholder/g, step.intro ) ,
                        $html = $( html ) ;
                    that.showMask() ;
                    if( that.prevStep ){ that.prevStep.hide() ; }
                    if( step._$ele ){
                        step._$ele.show() ;
                    }else{
                        step._$ele = $html ;
                        $body.append( $html.show() ) ;
                        $html.on("click.mintro",".mintro_close",function(){
                            that.destroy() ;
                        }).on("click.mintro",".mintro_next",function(){
                            that.goToStep( index + 1 ) ;
                        }) ;
                    }
                    that.prevStep = step._$ele ;
                    that.calcPosition( { $step_ele: step._$ele , target: step.element , diff: step.diff } ) ;
                } ,
                destroy: function(){
                    this.getMaskEle().remove() ;
                    $( "." + stepClass ).remove() ;
                    destroyCallback() ;
                }
            }
        $window.on('resize.mintro',function(){
            operator.resizePosition() ;
        }).on('scroll.mintro',function(){
            operator.resizePosition() ;
        }) ;
        operator.goToStep( firstStep ) ;
        return operator ;
    }
    return mintro ;
} ) ;