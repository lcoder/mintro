## 基于jquery的引导插件mintro

demo：
![引导插件mintro_demo](http://oco9w3mgp.bkt.clouddn.com/blog_images/mintro_demo.png)

使用方法：
```javascript
mintro( {
    firstStep: 0 ,          // 默认显示第几个引导
    stepClass: 'mintro_steps' , // 每个引导元素包裹的class
    steps: [                // steps 数组纪录按顺序需要显示的引导
                            // element jquery选择器，设置的话，即引导需要吸附的元素
                            // intro 引导元素的html代码，一般自定义引导就在这里设置
                            // diff  对象，设置intro的定位。根据element元素的左上角，相差top，left像素的值计算intro的定位，目的是方便精确引导定位。
                            // 需要注意：.mintro_close , .mintro_next 为每个引导元素intro，代表关闭和下一个引导。需要css，根据需求自定义位置
        { intro: '<div class="first_step0"></div>' } ,
        { element: '.intro1' , intro: '<div class="first_step1"></div>' , diff: { top: -30 , left: 24 } } ,
        { element: '.intro2' , intro: '<div class="first_step2"></div>' , diff: { top: -50 , left: 24 } } ,
        { element: '.intro3' , intro: '<div class="first_step3"></div>' , diff: { top: -44 , left: 24 } } ,
        { element: '.intro4' , intro: '<div class="first_step4"></div>' , diff: { top: -50 , left: 24 } } ,
        { element: '.intro5' , intro: '<div class="first_step5"></div>' , diff: { top: -8 , left: -50 } }
    ] ,
    destroy: function(){}   // 关闭引导的回调，一般都是在此处设置cookie记录本次已访问
} ) ;
```