(function (lib, img, cjs, txt) {

    var p; // shortcut to reference prototypes

// stage content:
    (lib.frame1 = function () {
        this.initialize();
        clearTexts();

        // Capa 1
        basicos(this, 0, 0, 1, 0, 0);
        
  var html = createDiv(txt['titulo'], "Verdana", "25px", '300px', '40px', "20px", "185px", "left");
    this.text1 = new cjs.DOMElement(html);
    this.text1.setTransform(70, -520);
    
        html = createDiv(txt['tex_1'], "Verdana", "20px", '350px', '40px', "20px", "185px", "left");
    this.text2 = new cjs.DOMElement(html);
    this.text2.setTransform(70, -440);
this.instance = new lib.CdP_Fase_01();
	this.instance.setTransform(620.1,287.1,1,1,0,0,0,-131.3,-260);

        this.siguiente.on("click", function (evt) {
            putStage(new lib.frame2());
        });


        this.addChild(this.logo, this.titulo, this.siguiente, this.imagen,this.text1,this.text2,this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 849, 548.3);

    (lib.frame2 = function () {
        this.initialize();
        clearTexts();

        // Capa 1
        basicos(this, 1, 0, 1, 0, 0);
        var html = createDiv(txt['titspore'], "Verdana", "25px", '300px', '40px', "20px", "185px", "left");
    this.text1 = new cjs.DOMElement(html);
    this.text1.setTransform(70, -520);
    
        html = createDiv(txt['texspore'], "Verdana", "20px", '350px', '40px', "20px", "185px", "left");
    this.text2 = new cjs.DOMElement(html);
    this.text2.setTransform(70, -440);
this.instance = new lib.CdP_Fase_01();
	this.instance.setTransform(620.1,287.1,1,1,0,0,0,-131.3,-260);

 var flecha = new lib.CdP_Flechas_al_2();
    this.instance_1 = new lib.fadeElement(flecha, 25);
    this.instance_1.setTransform(699.6,182.1,1,1,0,0,0,-41.1,-42);
    
     var flecha = new lib.CdP_Fase_02();
    this.instance_2 = new lib.fadeElement(flecha, 45);
    this.instance_2.setTransform(763.5,213.1,1,1,0,0,0,-114,-77.7);
    
        this.siguiente.on("click", function (evt) {
            putStage(new lib.frame3());
        });
        this.home.on("click", function (evt) {
            putStage(new lib.frame1());
        });

        this.addChild(this.logo, this.titulo, this.home, this.siguiente,this.text1,this.text2,this.instance,this.instance_1,this.instance_2);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 849, 548.3);

    (lib.frame3 = function () {
        this.initialize();
        clearTexts();

        // Capa 1
        basicos(this, 1, 1, 1, 0, 0);
         var html = createDiv(txt['titpoll'], "Verdana", "25px", '300px', '40px', "20px", "185px", "left");
    this.text1 = new cjs.DOMElement(html);
    this.text1.setTransform(70, -520);
    
        html = createDiv(txt['texpoll_1'], "Verdana", "20px", '350px', '40px', "20px", "185px", "left");
    this.text2 = new cjs.DOMElement(html);
    this.text2.setTransform(70, -440);
this.instance_2 = new lib.CdP_Fase_02();
	this.instance_2.setTransform(762.5,213.1,1,1,0,0,0,-114,-77.7);

	this.instance_3 = new lib.CdP_Flechas_al_2();
	this.instance_3.setTransform(698.6,182.1,1,1,0,0,0,-41.1,-42);

	this.instance_4 = new lib.CdP_Fase_01();
	this.instance_4.setTransform(619.6,287.1,1,1,0,0,0,-131.3,-260);
        
 var flecha = new lib.CdP_Flechas_al_3();
    this.instance = new lib.fadeElement(flecha, 25);
    this.instance.setTransform(852.5,249.1,1,1,0,0,0,-78.5,-76.4);
    
     var flecha = new lib.CdP_Fase_03();
    this.instance_1 = new lib.fadeElement(flecha, 45);
    this.instance_1.setTransform(796.4,337.3,1,1,0,0,0,-100.7,-136.7);

        this.anterior.on("click", function (evt) {
            putStage(new lib.frame2());
        });
        this.siguiente.on("click", function (evt) {
            putStage(new lib.frame4());
        });
        this.home.on("click", function (evt) {
            putStage(new lib.frame1());
        });

        this.addChild(this.logo, this.titulo, this.home, this.anterior, this.siguiente,this.text1,this.text2,this.instance,this.instance_1,this.instance_2,this.instance_3,this.instance_4);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 849, 548.3);

    (lib.frame4 = function () {
        this.initialize();
        clearTexts();

        // Capa 1
        basicos(this, 1, 1, 1, 0, 0);
         var html = createDiv(txt['titpoll'], "Verdana", "25px", '300px', '40px', "20px", "185px", "left");
    this.text1 = new cjs.DOMElement(html);
    this.text1.setTransform(70, -520);
    
        html = createDiv(txt['texpoll_2'], "Verdana", "20px", '350px', '40px', "20px", "185px", "left");
    this.text2 = new cjs.DOMElement(html);
    this.text2.setTransform(70, -440);
        var flecha = new lib.CdP_Abeja();
        this.instance = new lib.fadeElement(flecha, 15);
	this.instance.setTransform(671.1,304.1,1,1,0,0,0,-276.9,-303.9);
        this.anterior.on("click", function (evt) {
            putStage(new lib.frame3());
        });
        this.siguiente.on("click", function (evt) {
            putStage(new lib.frame5());
        });
        this.home.on("click", function (evt) {
            putStage(new lib.frame1());
        });

        this.addChild(this.logo, this.titulo, this.home, this.anterior, this.siguiente,this.text1,this.text2,this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 849, 548.3);

(lib.frame5 = function () {
        this.initialize();
        clearTexts();

        // Capa 1
        basicos(this, 1, 1, 1, 0, 0);
        
 var html = createDiv(txt['titfert'], "Verdana", "25px", '300px', '40px', "20px", "185px", "left");
    this.text1 = new cjs.DOMElement(html);
    this.text1.setTransform(70, -520);
    
        html = createDiv(txt['texfert'], "Verdana", "20px", '350px', '40px', "20px", "185px", "left");
    this.text2 = new cjs.DOMElement(html);
    this.text2.setTransform(70, -480);
    
        var flecha = new lib.CdP_Fase_04_5();
        this.instance = new lib.fadeElement(flecha, 35);
	this.instance.alpha = 0.828;
	this.instance.setTransform(534.9,537.1,1,1,0,0,0,-54.9,-54.2);

	this.instance_1 = new lib.CdP_Flecha4_5();
        var flecha = new lib.CdP_Flecha4_5();
        this.instance_1 = new lib.fadeElement(flecha, 35);
	this.instance_1.setTransform(645.7,561.8,1,1,0,0,0,-53,-10.6);

	
        var flecha = new lib.CdP_Fase_04();
        this.instance_2 = new lib.fadeElement(flecha, 15);
	this.instance_2.setTransform(778.1,485.1,1,1,0,0,0,-92.1,-99.9);

	
        var flecha = new lib.CdP_Flechas_al_4();
        this.instance_3 = new lib.fadeElement(flecha, 15);
	this.instance_3.setTransform(782,449.1,1,1,0,0,0,-19.2,-26.2);

	this.instance_4 = new lib.CdP_Abeja();
	this.instance_4.setTransform(241.4,411.3,0.529,0.529,0,0,0,-276.9,-304);

	this.instance_5 = new lib.CdP_Fase_03();
	this.instance_5.setTransform(795.4,337.3,1,1,0,0,0,-100.7,-136.7);

	this.instance_6 = new lib.CdP_Flechas_al_3();
	this.instance_6.setTransform(851.5,249.1,1,1,0,0,0,-78.5,-76.4);

	this.instance_7 = new lib.CdP_Fase_02();
	this.instance_7.setTransform(761.5,213.1,1,1,0,0,0,-114,-77.7);

	this.instance_8 = new lib.CdP_Flechas_al_2();
	this.instance_8.setTransform(697.6,182.1,1,1,0,0,0,-41.1,-42);

	this.instance_9 = new lib.CdP_Fase_01();
	this.instance_9.setTransform(618.6,287.1,1,1,0,0,0,-131.3,-260);
        
        this.anterior.on("click", function (evt) {
            putStage(new lib.frame4());
        });
        this.siguiente.on("click", function (evt) {
            putStage(new lib.frame6());
        });
        this.home.on("click", function (evt) {
            putStage(new lib.frame1());
        });

        this.addChild(this.logo, this.titulo,this.instance_4, this.home, this.anterior, this.siguiente,this.text1,this.text2,this.instance,this.instance_1,this.instance_2,this.instance_3,this.instance_5,this.instance_6,this.instance_7,this.instance_8,this.instance_9);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 849, 548.3);
(lib.frame6 = function () {
        this.initialize();
        clearTexts();

        // Capa 1
        basicos(this, 1, 1, 1, 0, 0);
       var html = createDiv(txt['titseed'], "Verdana", "25px", '400px', '40px', "20px", "185px", "left");
    this.text1 = new cjs.DOMElement(html);
    this.text1.setTransform(70, -520);
    
        html = createDiv(txt['texseed'], "Verdana", "20px", '350px', '40px', "20px", "185px", "left");
    this.text2 = new cjs.DOMElement(html);
    this.text2.setTransform(70, -440);
this.instance = new lib.CdP_Mongeta();
 var flecha = new lib.CdP_Mongeta();
        this.instance = new lib.fadeElement(flecha, 55);
	this.instance.setTransform(241.2,368.4,1,1,0,0,0,-134.7,-158.8);

	this.instance_1 = new lib.CdP_Fase_05();
 var flecha = new lib.CdP_Fase_05();
        this.instance_1 = new lib.fadeElement(flecha, 35);
	this.instance_1.setTransform(425.9,388.9,1,1,0,0,0,-85,-67.4);

	this.instance_2 = new lib.CdP_Flechas_al_5();
 var flecha = new lib.CdP_Flechas_al_5();
        this.instance_2 = new lib.fadeElement(flecha, 15);
        this.instance_2.setTransform(506.7,476.5,1,1,0,0,0,-11.9,-19.2);

	this.instance_3 = new lib.CdP_Fase_04_5();
	this.instance_3.setTransform(535.9,537.1,1,1,0,0,0,-54.9,-54.2);

	this.instance_4 = new lib.CdP_Flecha4_5();
	this.instance_4.setTransform(646.7,561.8,1,1,0,0,0,-53,-10.6);

	this.instance_5 = new lib.CdP_Fase_04();
	this.instance_5.setTransform(779.1,485.1,1,1,0,0,0,-92.1,-99.9);

	this.instance_6 = new lib.CdP_Flechas_al_4();
	this.instance_6.setTransform(783,449.1,1,1,0,0,0,-19.2,-26.2);

	this.instance_7 = new lib.CdP_Abeja();
	this.instance_7.setTransform(242.4,411.3,0.529,0.529,0,0,0,-276.9,-304);
	this.instance_7.alpha = 0;

	this.instance_8 = new lib.CdP_Fase_03();
	this.instance_8.setTransform(796.4,337.3,1,1,0,0,0,-100.7,-136.7);

	this.instance_9 = new lib.CdP_Flechas_al_3();
	this.instance_9.setTransform(852.5,249.1,1,1,0,0,0,-78.5,-76.4);

	this.instance_10 = new lib.CdP_Fase_02();
	this.instance_10.setTransform(762.5,213.1,1,1,0,0,0,-114,-77.7);

	this.instance_11 = new lib.CdP_Flechas_al_2();
	this.instance_11.setTransform(698.6,182.1,1,1,0,0,0,-41.1,-42);

	this.instance_12 = new lib.CdP_Fase_01();
	this.instance_12.setTransform(619.6,287.1,1,1,0,0,0,-131.3,-260);
        this.anterior.on("click", function (evt) {
            putStage(new lib.frame5());
        });
        this.siguiente.on("click", function (evt) {
            putStage(new lib.frame7());
        });
        this.home.on("click", function (evt) {
            putStage(new lib.frame1());
        });

        this.addChild(this.logo, this.titulo, this.home, this.anterior, this.siguiente,this.text1,this.text2,this.instance_12,this.instance_11,this.instance_10,this.instance_9,this.instance_8,this.instance_7,this.instance_6,this.instance_5,this.instance_4,this.instance_3,this.instance_2,this.instance_1,this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 849, 548.3);
(lib.frame7 = function () {
        this.initialize();
        clearTexts();

        // Capa 1
        basicos(this, 1, 1, 1, 0, 0);
        var html = createDiv(txt['titdisp'], "Verdana", "25px", '300px', '40px', "20px", "185px", "left");
    this.text1 = new cjs.DOMElement(html);
    this.text1.setTransform(70, -520);
    
        html = createDiv(txt['texdisp_1'], "Verdana", "20px", '350px', '40px', "20px", "185px", "left");
    this.text2 = new cjs.DOMElement(html);
    this.text2.setTransform(70, -440);

this.instance = new lib.CdP_Fase_06();
var flecha = new lib.CdP_Fase_06();
        this.instance = new lib.fadeElement(flecha, 35);
 	this.instance.setTransform(473.7,278,1,1,0,0,0,-42,-61);

	this.instance_1 = new lib.CdP_Flechas_al_6();
var flecha = new lib.CdP_Flechas_al_6();
        this.instance_1 = new lib.fadeElement(flecha, 15);
 	this.instance_1.setTransform(486.7,345.3,1,1,0,0,0,-9,-20.6);

	this.instance_2 = new lib.CdP_Fase_05();
	this.instance_2.setTransform(425.9,388.9,1,1,0,0,0,-85,-67.4);

	this.instance_3 = new lib.CdP_Flechas_al_5();
	this.instance_3.setTransform(506.7,476.5,1,1,0,0,0,-11.9,-19.2);

	this.instance_4 = new lib.CdP_Fase_04_5();
	this.instance_4.setTransform(535.9,537.1,1,1,0,0,0,-54.9,-54.2);

	this.instance_5 = new lib.CdP_Flecha4_5();
	this.instance_5.setTransform(646.7,561.8,1,1,0,0,0,-53,-10.6);

	this.instance_6 = new lib.CdP_Fase_04();
	this.instance_6.setTransform(779.1,485.1,1,1,0,0,0,-92.1,-99.9);

	this.instance_7 = new lib.CdP_Flechas_al_4();
	this.instance_7.setTransform(783,449.1,1,1,0,0,0,-19.2,-26.2);

	this.instance_8 = new lib.CdP_Fase_03();
	this.instance_8.setTransform(796.4,337.3,1,1,0,0,0,-100.7,-136.7);

	this.instance_9 = new lib.CdP_Flechas_al_3();
	this.instance_9.setTransform(852.5,249.1,1,1,0,0,0,-78.5,-76.4);

	this.instance_10 = new lib.CdP_Fase_02();
	this.instance_10.setTransform(762.5,213.1,1,1,0,0,0,-114,-77.7);

	this.instance_11 = new lib.CdP_Flechas_al_2();
	this.instance_11.setTransform(698.6,182.1,1,1,0,0,0,-41.1,-42);

	this.instance_12 = new lib.CdP_Fase_01();
	this.instance_12.setTransform(619.6,287.1,1,1,0,0,0,-131.3,-260);
        
        this.anterior.on("click", function (evt) {
            putStage(new lib.frame6());
        });
        this.siguiente.on("click", function (evt) {
            putStage(new lib.frame8());
        });
        this.home.on("click", function (evt) {
            putStage(new lib.frame1());
        });

        this.addChild(this.logo, this.titulo, this.home, this.anterior, this.siguiente,this.text1,this.text2,this.instance_12,this.instance_11,this.instance_10,this.instance_9,this.instance_8,this.instance_7,this.instance_6,this.instance_5,this.instance_4,this.instance_3,this.instance_2,this.instance_1,this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 849, 548.3);
(lib.frame8 = function () {
        this.initialize();
        clearTexts();

        // Capa 1
        basicos(this, 1, 1, 1, 0, 0);
       var html = createDiv(txt['titdisp'], "Verdana", "25px", '300px', '40px', "20px", "185px", "left");
    this.text1 = new cjs.DOMElement(html);
    this.text1.setTransform(70, -520);
    
        html = createDiv(txt['texdisp_2'], "Verdana", "20px", '350px', '40px', "20px", "185px", "left");
    this.text2 = new cjs.DOMElement(html);
    this.text2.setTransform(70, -440);

this.instance = new lib.CdP_DentLleo();
var flecha = new lib.CdP_DentLleo();
        this.instance = new lib.fadeElement(flecha, 15);
	this.instance.setTransform(617.3,304.1,1,1,0,0,0,-321.4,-303.9);


        this.anterior.on("click", function (evt) {
            putStage(new lib.frame7());
        });
        this.siguiente.on("click", function (evt) {
            putStage(new lib.frame9());
        });
        this.home.on("click", function (evt) {
            putStage(new lib.frame1());
        });

        this.addChild(this.logo, this.titulo, this.home, this.anterior, this.siguiente,this.text1,this.text2,this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 849, 548.3);
(lib.frame9 = function () {
        this.initialize();
        clearTexts();

        // Capa 1
        basicos(this, 1, 1, 1, 0, 0);
         var html = createDiv(txt['titdisp'], "Verdana", "25px", '300px', '40px', "20px", "185px", "left");
    this.text1 = new cjs.DOMElement(html);
    this.text1.setTransform(70, -520);
    
        html = createDiv(txt['texdisp_3'], "Verdana", "20px", '350px', '40px', "20px", "185px", "left");
    this.text2 = new cjs.DOMElement(html);
    this.text2.setTransform(70, -440);
this.instance = new lib.CdP_Esquirol();
var flecha = new lib.CdP_Esquirol();
        this.instance = new lib.fadeElement(flecha, 15);
	this.instance.setTransform(617.3,304.1,1,1,0,0,0,-321.4,-303.9);

        this.anterior.on("click", function (evt) {
            putStage(new lib.frame8());
        });
        this.siguiente.on("click", function (evt) {
            putStage(new lib.frame10());
        });
        this.home.on("click", function (evt) {
            putStage(new lib.frame1());
        });

        this.addChild(this.logo, this.titulo, this.home, this.anterior, this.siguiente,this.text1,this.text2,this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 849, 548.3);

    (lib.frame10 = function () {
        this.initialize();
        clearTexts();

        // Capa 1
        basicos(this, 1, 1, 0, 0, 0);
      var html = createDiv(txt['titgerm'], "Verdana", "25px", '300px', '40px', "20px", "185px", "left");
    this.text1 = new cjs.DOMElement(html);
    this.text1.setTransform(70, -520);
    
        html = createDiv(txt['texgerm'], "Verdana", "20px", '350px', '40px', "20px", "185px", "left");
    this.text2 = new cjs.DOMElement(html);
    this.text2.setTransform(70, -440);

this.instance = new lib.CdP_Llavors();
	this.instance.setTransform(212.8,396.4,1,1,0,0,0,-207.1,-118.9);

	this.instance_1 = new lib.CdP_Flechas_al_1();
var flecha = new lib.CdP_Flechas_al_1();
        this.instance_1 = new lib.fadeElement(flecha, 55);
	this.instance_1.setTransform(557.9,103.9,1,1,0,0,0,-40.9,-19.1);

	this.instance_2 = new lib.CdP_Fase_07();
var flecha = new lib.CdP_Fase_07();
        this.instance_2 = new lib.fadeElement(flecha, 35);
	this.instance_2.setTransform(511.2,129.8,1,1,0,0,0,-70.1,-102.4);

	this.instance_3 = new lib.CdP_Flechas_al_7();
var flecha = new lib.CdP_Flechas_al_7();
        this.instance_3 = new lib.fadeElement(flecha, 15);
	this.instance_3.setTransform(457.5,172.9,1,1,0,0,0,-23.7,-38.4);

	

	this.instance_7 = new lib.CdP_Fase_06();
	this.instance_7.setTransform(474.7,278.3,1,1,0,0,0,-42,-61);

	this.instance_8 = new lib.CdP_Flechas_al_6();
	this.instance_8.setTransform(487.7,345.6,1,1,0,0,0,-9,-20.6);

	this.instance_9 = new lib.CdP_Mongeta();
	this.instance_9.setTransform(242.2,368.6,1,1,0,0,0,-134.7,-158.8);
	this.instance_9.alpha = 0;

	this.instance_10 = new lib.CdP_Fase_05();
	this.instance_10.setTransform(426.9,389.1,1,1,0,0,0,-85,-67.4);

	this.instance_11 = new lib.CdP_Flechas_al_5();
	this.instance_11.setTransform(507.7,476.7,1,1,0,0,0,-11.9,-19.2);

	this.instance_12 = new lib.CdP_Fase_04_5();
	this.instance_12.setTransform(536.9,537.4,1,1,0,0,0,-54.9,-54.2);

	this.instance_13 = new lib.CdP_Flecha4_5();
	this.instance_13.setTransform(647.7,562,1,1,0,0,0,-53,-10.6);

	this.instance_14 = new lib.CdP_Fase_04();
	this.instance_14.setTransform(780.1,485.3,1,1,0,0,0,-92.1,-99.9);

	this.instance_15 = new lib.CdP_Flechas_al_4();
	this.instance_15.setTransform(784,449.4,1,1,0,0,0,-19.2,-26.2);

	this.instance_16 = new lib.CdP_Abeja();
	this.instance_16.setTransform(243.4,411.6,0.529,0.529,0,0,0,-276.9,-304);
	this.instance_16.alpha = 0;

	this.instance_17 = new lib.CdP_Fase_03();
	this.instance_17.setTransform(797.4,337.6,1,1,0,0,0,-100.7,-136.7);

	this.instance_18 = new lib.CdP_Flechas_al_3();
	this.instance_18.setTransform(853.5,249.4,1,1,0,0,0,-78.5,-76.4);

	this.instance_19 = new lib.CdP_Fase_02();
	this.instance_19.setTransform(763.5,213.3,1,1,0,0,0,-114,-77.7);

	this.instance_20 = new lib.CdP_Flechas_al_2();
	this.instance_20.setTransform(699.6,182.4,1,1,0,0,0,-41.1,-42);

	this.instance_21 = new lib.CdP_Fase_01();
	this.instance_21.setTransform(620.6,287.3,1,1,0,0,0,-131.3,-260);
        
        this.anterior.on("click", function (evt) {
            putStage(new lib.frame9());
        });
        this.home.on("click", function (evt) {
            putStage(new lib.frame1());
        });

        this.addChild(this.logo, this.titulo, this.home, this.anterior,this.text1,this.text2,this.instance_21,this.instance_20,this.instance_19,this.instance_18,this.instance_17,this.instance_16,this.instance_15,this.instance_14,this.instance_13,this.instance_12,this.instance_11,this.instance_10,this.instance_9,this.instance_8,this.instance_7,this.instance_6,this.instance_5,this.instance_4,this.instance_3,this.instance_2,this.instance_1,this.instance);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 849, 548.3);


// symbols:

    function titulo1(escena, texto) {
        var html = createDiv(texto, "Georgia", "31px", '770px', '100px', "20px", "185px", "center");
        escena.titulo = new cjs.DOMElement(html);
        escena.titulo.setTransform(90, -588);
    }
    function titulo2(escena, texto, size) {
        size = size || '25px';
        var html = createDiv(texto, "Verdana", size, '770px', '100px', "20px", "185px", "left");
        escena.titulo = new cjs.DOMElement(html);
        escena.titulo.setTransform(90, -588);
    }
    function texto(escena, texto, side, ancho) {
        width = 730 - ancho;
        var html = createDiv(texto, "Verdana", "20px", width + 'px', '400px', "20px", "185px", "left");
        escena.texto = new cjs.DOMElement(html);
        if (side == 0)
            escena.texto.setTransform(90, -482);
        else
            escena.texto.setTransform(130 + ancho, -482);
    }

    function imagen(escena, side, scX, scY) {
        var theBounds = escena.imagen.getBounds();

        if (side == 0)
            escena.imagen.setTransform(90, 130, scX, scY);
        else {
            escena.imagen.setTransform(860 - theBounds.width * scX, 130, scX, scY);
        }
        return theBounds.width * scX;
    }

    /*function basicos(escena, home, anterior, siguiente, informacion, cerrar) {
        escena.logo = new lib.gris();
        escena.logo.setTransform(45, 45, 1, 1, 0, 0, 0, 30, 30);
        escena.logo.alpha = 0.301;
        if (home == 1) {
            escena.home = new lib.btn_inicio();
            escena.home.setTransform(30, 578);
            new cjs.ButtonHelper(escena.home, 0, 1, 2, false, new lib.btn_inicio(), 3);
        }
        if (anterior == 1) {
            escena.anterior = new lib.btn_anterior();
            escena.anterior.setTransform(83, 578);
            new cjs.ButtonHelper(escena.anterior, 0, 1, 2, false, new lib.btn_anterior(), 3);
        }
        if (siguiente == 1) {
            escena.siguiente = new lib.btn_siguiente();
            escena.siguiente.setTransform(126, 578);
            new cjs.ButtonHelper(escena.siguiente, 0, 1, 2, false, new lib.btn_siguiente(), 3);
        }
        if (informacion == 1) {
            escena.informacion = new lib.btn_info();
            escena.informacion.setTransform(158.6, 562);
            new cjs.ButtonHelper(escena.informacion, 0, 1, 2, false, new lib.btn_info(), 3);
        }
        if (cerrar == 1) {
            escena.cerrar = new lib.btn_cerrar();
            escena.cerrar.setTransform(920, 25, 0.775, 0.733);
            new cjs.ButtonHelper(escena.cerrar, 0, 1, 2, false, new lib.btn_cerrar(), 3);
        }
    }*/
    
      function basicos(escena, home, anterior, siguiente, informacion, cerrar,audio) {
        escena.logo = new lib.gris();
        escena.logo.setTransform(45, 45, 1, 1, 0, 0, 0, 30, 30);
        escena.logo.alpha = 0.301;
        if (home == 1) {
            escena.home = new lib.btn_inicio();
            escena.home.setTransform(60, 578,1.15,1.15);
            new cjs.ButtonHelper(escena.home, 0, 1, 2, false, new lib.btn_inicio(), 3);
        }
        if (home == 2) {
            escena.home = new lib.btn_inicioneg();
            escena.home.setTransform(60, 57,1.15,1.15);
            new cjs.ButtonHelper(escena.home, 0, 1, 2, false, new lib.btn_inicio(), 3);
        }
        if (anterior == 1) {
            escena.anterior = new lib.btn_anterior();
            escena.anterior.setTransform(125, 578,1.15,1.15);
            new cjs.ButtonHelper(escena.anterior, 0, 1, 2, false, new lib.btn_anterior(), 3);
        }
         if (anterior == 2) {
            escena.anterior = new lib.btn_anteriorneg();
            escena.anterior.setTransform(125, 578,1.15,1.15);
            new cjs.ButtonHelper(escena.anterior, 0, 1, 2, false, new lib.btn_anterior(), 3);
        }
        if (siguiente == 1) {
            escena.siguiente = new lib.btn_siguiente();
            escena.siguiente.setTransform(170, 578,1.15,1.15);
            new cjs.ButtonHelper(escena.siguiente, 0, 1, 2, false, new lib.btn_siguiente(), 3);
        }
          if (siguiente == 2) {
            escena.siguiente = new lib.btn_siguienteneg();
            escena.siguiente.setTransform(170, 578,1.15,1.15);
            new cjs.ButtonHelper(escena.siguiente, 0, 1, 2, false, new lib.btn_siguiente(), 3);
        }
        
      if (informacion == 1) {
            escena.informacion = new lib.btn_info();
            if (audio==1)
            escena.informacion.setTransform(280, 560,1.15,1.15);
        else
            escena.informacion.setTransform(217, 560,1.15,1.15);
            new cjs.ButtonHelper(escena.informacion, 0, 1, 2, false, new lib.btn_info(), 3);
        }
      if (informacion == 2) {
            escena.informacion = new lib.btn_infoneg();
            if (audio==1)
            escena.informacion.setTransform(280, 560,1.15,1.15);
        else
            escena.informacion.setTransform(217, 560,1.15,1.15);
            new cjs.ButtonHelper(escena.informacion, 0, 1, 2, false, new lib.btn_info(), 3);
        }
        if (cerrar == 1) {
            escena.cerrar = new lib.btn_cerrar();
            escena.cerrar.setTransform(908, 35, 1.15, 1.15);
            new cjs.ButtonHelper(escena.cerrar, 0, 1, 2, false, new lib.btn_cerrar(), 3);
        }
         if (cerrar == 2) {
            escena.cerrar = new lib.btn_cerrarneg();
            escena.cerrar.setTransform(908, 35, 1.15, 1.15);
            new cjs.ButtonHelper(escena.cerrar, 0, 1, 2, false, new lib.btn_cerrar(), 3);
        }
        if (audio == 1) {
            escena.audioplay = new lib.btn_AudioPlay_ok();
            escena.audioplay.setTransform(232, 568, 1.6, 1.6);
            new cjs.ButtonHelper(escena.audioplay, 0, 1, 2, false, new lib.btn_AudioPlay_ok(), 3);
            escena.audiopause = new lib.btn_AudioPause_ok();
            escena.audiopause.setTransform(267, 568, 1.54, 1.54);
            new cjs.ButtonHelper(escena.audiopause, 0, 1, 2, false, new lib.btn_AudioPause_ok(), 3);
            escena.audiopause.visible = false;
        }
    }
   
   //Simbolillos
   (lib._000TT901 = function() {
	this.initialize(img._000TT901);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,608,608);


(lib._0012EX01 = function() {
	this.initialize(img._0012EX01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,319,376);


(lib._0016G701 = function() {
	this.initialize(img._0016G701);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,411,608);


(lib._001Q2401 = function() {
	this.initialize(img._001Q2401);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,655,376);


(lib._0028LZ01 = function() {
	this.initialize(img._0028LZ01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,608,608);


(lib.Capa1 = function() {
	this.initialize(img.Capa1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,945,1654);


(lib.Capa1_1 = function() {
	this.initialize(img.Capa1_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,827);


(lib.Capa1copia = function() {
	this.initialize(img.Capa1copia);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,795,1161);


(lib.Capa10 = function() {
	this.initialize(img.Capa10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,827);


(lib.Capa10_1 = function() {
	this.initialize(img.Capa10_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,827);


(lib.Capa11 = function() {
	this.initialize(img.Capa11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,827);


(lib.Capa11_1 = function() {
	this.initialize(img.Capa11_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,827);


(lib.Capa3 = function() {
	this.initialize(img.Capa3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,795,1161);


(lib.Capa5 = function() {
	this.initialize(img.Capa5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,472);


(lib.Capa5_1 = function() {
	this.initialize(img.Capa5_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,1181);


(lib.Capa5_2 = function() {
	this.initialize(img.Capa5_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,1181);


(lib.Capa6 = function() {
	this.initialize(img.Capa6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,827);


(lib.Capa6_1 = function() {
	this.initialize(img.Capa6_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,827);


(lib.Capa6_2 = function() {
	this.initialize(img.Capa6_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,827);


(lib.Capa6_3 = function() {
	this.initialize(img.Capa6_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,827);


(lib.Capa6_4 = function() {
	this.initialize(img.Capa6_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,827);


(lib.Capa6_0 = function() {
	this.initialize(img.Capa6_0);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,472);


(lib.Capa6_0_1 = function() {
	this.initialize(img.Capa6_0_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,1181);


(lib.Capa6_0_2 = function() {
	this.initialize(img.Capa6_0_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,1181);


(lib.Capa7 = function() {
	this.initialize(img.Capa7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,472);


(lib.Capa7_1 = function() {
	this.initialize(img.Capa7_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,1181);


(lib.Capa7_2 = function() {
	this.initialize(img.Capa7_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,827);


(lib.Capa7_3 = function() {
	this.initialize(img.Capa7_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,827);


(lib.Capa7_4 = function() {
	this.initialize(img.Capa7_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,827);


(lib.Capa8 = function() {
	this.initialize(img.Capa8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,472);


(lib.Capa8_1 = function() {
	this.initialize(img.Capa8_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,827);


(lib.Capa8_2 = function() {
	this.initialize(img.Capa8_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,827);


(lib.Capa9 = function() {
	this.initialize(img.Capa9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,827);


(lib.Capa9_1 = function() {
	this.initialize(img.Capa9_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,472,827);


(lib.ImatgeGuia = function() {
	this.initialize(img.ImatgeGuia);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2468,2356);


(lib.pautas950x608nuevosarreglos = function() {
	this.initialize(img.pautas950x608nuevosarreglos);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,950,608);


(lib.CdP_Planteta = function() {
	this.initialize();

	// Capa 1
	this.instance = new lib._001Q2401();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,655,376);


(lib.CdP_PastillaBlanca = function() {
	this.initialize();

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Eg2zAvgMAAAhe/MBtnAAAMAAABe/g");
	this.shape.setTransform(-350.8,-303.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-701.6,-607.9,701.7,608);


(lib.CdP_Mongeta = function() {
	this.initialize();

	// Capa 1
	this.instance = new lib._0012EX01();
	this.instance.setTransform(-282.2,-271.2,0.725,0.725);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-282.2,-271.2,231.4,272.8);

(lib.CdP_Flechas_al_7 = function() {
	this.initialize();

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1D1D1C").s().p("AgwAAIAHgLIAHAGQAAgKACgFQABgGAEgGQAIgKAKgBQAJAAAKAIIAnAeIgIAJIgpgeQgEgDgDAAQgCAAgEABQgDACgDAEQgDAEgCAGIgBAMIArAiIgIAKg");
	this.shape.setTransform(-5.6,-72.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1D1D1C").s().p("AgJAoQgPgLgDgOQgDgOAJgLQAJgOAMgBQAOgCAPALQAPAKAEAMQAEAOgJANQgKAOgOACIgDAAQgNAAgMgJgAAAgNQgHABgFAIQgGAHADAIQACAKAMAIQAKAIAJgBQAKgBAFgIQAGgIgCgJQgDgJgMgGQgLgIgKAAIgBAAgAgwgjIAJgNIALAeIgGAIg");
	this.shape_1.setTransform(-11.7,-66.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#1D1D1C").s().p("AgXgGIAHgLIA+AnIgHALgAgtgUIAIgMIALAHIgIAMg");
	this.shape_2.setTransform(-15.3,-61.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1D1D1C").s().p("AgCAlQgJgBgHgFQgRgLgDgOQgEgMAJgOQAEgGAFgEQAEgEAGgEIAMAIIgBAAIgMAHIgJAJQgFAKADAGQADAKAMAHQAKAHAJgBQAJgBAGgKIAEgHIABgHIAAgKIAMAHIgCALQgBAFgEAHQgEAHgGAEQgGAFgGABIgHACIgGgCg");
	this.shape_3.setTransform(-16.7,-56.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#1D1D1C").s().p("AgEAjQgHgEgDgGQgDgHABgHQACgIADgGIAJgTIgCgBIgGgCIgGABIgGAFIgEAGIgFALIgDALIAAAAIgLgGIADgJQACgGAEgGIAIgMQAGgFAEgBQADgCAHAAQAGABADADIAtAaIgGAJIgHgCIABAKIgCAIIgEAJQgFAJgKADIgHABQgGAAgEgEgAgEAGQgBAFABAFQACAEACADQAGAEAFgCQAEgCAFgHQADgGABgGIAAgKIgTgLg");
	this.shape_4.setTransform(-21.1,-48.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#1D1D1C").s().p("AgvAFIAGgJIAHAEIgBgPQABgIADgFQAGgKAKgDQAJgCALAHIArAYIgGALIgtgZIgHgCQgDAAgDADQgDABgDAFQgDAFAAAGQAAAHABAEIAwAbIgGAMg");
	this.shape_5.setTransform(-25.5,-41.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#1D1D1C").s().p("AgXgEIAGgMIBBAiIgGAMgAgvgQIAHgNIAMAHIgHANg");
	this.shape_6.setTransform(-29.7,-36.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#1D1D1C").s().p("Ag6AcIAGgLIAIAEIgCgOQAAgHADgEQAEgHAFgDQAFgEAHAAQgCgLAAgGQAAgFAEgIQAFgLAKgCQAIgCAMAGIAsAWIgGAMIgvgYIgGgBQgDAAgDACQgDACgCAFQgCAEAAAHIABAMIAxAXIgGAMIgugWIgHgBQgEAAgCACQgEACgBADQgDAFAAAFIABANIAxAZIgGAMg");
	this.shape_7.setTransform(-32.5,-27.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#1D1D1C").s().p("AgkAEIAGgJIAKAEQgCgIAAgIIADgLIAFgIIALAFIAAABIgDAEIgDAGQgDAGAAAGIACAKIAvAYIgGALg");
	this.shape_8.setTransform(-37.3,-19.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#1D1D1C").s().p("AgPAgQgSgIgFgOQgGgLAHgQQAHgNAMgEQAKgEAOAHIAHADIgWAxQAGADAEAAQAGABAEgDQAEgBAEgEQAEgEACgFQAEgIAAgGQAAgKgBgDIABAAIAMAGIgBANQgBAFgDAHQgIARgOAGQgGACgGAAQgHAAgKgFgAgQgXQgGACgFAJQgFAKADAGQADAIAIAFIASgmQgGgDgFAAIgFABg");
	this.shape_9.setTransform(-39.7,-13);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#1D1D1C").s().p("AAXAqIAAgBIAHgIIAHgLQADgGAAgFQAAgGgCgCQgBgDgDgBIgHgEIgHgDQACAGAAAFQAAAGgDAHQgGANgMADQgKAEgRgIQgJgEgFgFQgGgHgCgFQgDgGAAgFQAAgIADgEQACgGADgEIAIgHIgDgCIAFgLIA8AbQASAIAFALQAEALgHAQIgMAUgAgggVQgDADgCAEQgEAKAEAGQAFAJALAFQAMAFAIgBQAGgCAEgJIADgJIgBgMIglgRIgGAIg");
	this.shape_10.setTransform(-42.3,-4.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.lf(["#FFFFFF","#D5C6DE","#A382B6"],[0,0.137,1],-9.7,20,11.1,-21.7).s().p("Ah9DOQBBifBTiWIg0ggICbhaIgBC1Ig3ggQhRCRg/Cdg");
	this.shape_11.setTransform(-12.6,-26.7);

	this.addChild(this.shape_11,this.shape_10,this.shape_9,this.shape_8,this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-47.5,-76.9,47.6,77);


(lib.CdP_Flechas_al_6 = function() {
	this.initialize();

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#FFFFFF","#D4C4DD","#A382B6"],[0,0.157,1],-0.4,18,0.4,-19.1).s().p("AgagnIAAgJIg/gBIBaicIBZCeIg/gBIAAAJQgBB9AKB0Ig0AEQgKh1AAiAg");
	this.shape.setTransform(-9,-20.6);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-18,-41.2,18.1,41.3);


(lib.CdP_Flechas_al_5 = function() {
	this.initialize();

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#FFFFFF","#D4C5DD","#A382B6"],[0,0.169,1],8,17.9,-11.8,-21).s().p("Ag9gnIg5AcIAMi0ICUBkIg2AcQA6B1BJBrIgsAfQhKhqg+h9g");
	this.shape.setTransform(-11.9,-19.2);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-23.9,-38.5,24,38.6);


(lib.CdP_Flechas_al_4 = function() {
	this.initialize();

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#FFFFFF","#D4C5DD","#A382B6"],[0,0.157,1],15.2,-3.3,-28.3,4.9).s().p("AifBUIAwAoQCRixBujQIAwAZQhzDZiSCzIAxAoIirA+g");
	this.shape.setTransform(-19.1,-26.2);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-38.4,-52.5,38.5,52.6);


(lib.CdP_Flechas_al_3 = function() {
	this.initialize();

	// FlashAICB
	this.text = new cjs.Text("desarrollo \ndel tubo polínico (gametófito   )", "14px Verdana");
	this.text.lineHeight = 14;
	this.text.lineWidth = 126;
	this.text.setTransform(-108,-131.2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1D1D1C").s().p("AgtAuQgNgNAAgTQAAgRANgNQAOgOASAAQAOAAAOALIAfgfIgaAAIAAgGIAngCIgCAnIgGAAIAAgaIgfAfQALAOAAAOQAAASgOAOQgNANgRAAQgSAAgOgNgAgngLQgLALAAAOQAAAPALALQALALAPAAQAOAAALgLQALgLAAgPQAAgOgLgLQgLgLgOAAQgPAAgLALg");
	this.shape.setTransform(-19,-97);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#FFFFFF","#D12127"],[0,1],-19.3,-52.6,23.3,60.9).s().p("AAzF7IA+gMQg2kHhOjGQhQjIiAi+IAtgfQCDDEBRDLQBSDMA3EMIA+gMIg7Csg");
	this.shape_1.setTransform(-119.4,-101.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#FFFFFF","#D4C4DD","#A382B6"],[0,0.184,1],-9.1,-20.5,11.8,21.9).s().p("AggB0IA4gbQhFiQhUiHIAugdQBTCIBJCWIA5gbIgPC0g");
	this.shape_2.setTransform(-144,-22);

	this.addChild(this.shape_2,this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-157.1,-153,174.6,153.1);


(lib.CdP_Flechas_al_2 = function() {
	this.initialize();

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1D1D1C").s().p("AgRAjQgJgFgEgEQgGgEgDgFIAGgNIABAAQAEAIAFAFQAFAFAHADQAHAEAEAAQAFgBADgFQACgFgBgCQgCgEgGgEIgKgIQgIgGgBgHQgCgGADgHIAGgHQAEgEAEAAQADgCAGABQAIABAFADIAMAIIAJAIIgGANIgBgBQgCgEgGgGQgGgGgGgDQgFgCgGAAQgEABgCAEQgCAEABAEIAFAHIANAIQAHAGACAGQACAHgDAHQgFAKgLACIgFAAQgHAAgKgEg");
	this.shape.setTransform(-28.6,0.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1D1D1C").s().p("AgaArIAehDIALAFIgdBEgAAIgkIAGgMIANAGIgGAMg");
	this.shape_1.setTransform(-33.1,-3.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#1D1D1C").s().p("AgQAjQgIgEgFgEIgJgJIAFgNIACAAQAEAHAFAFQAEAFAIAEQAIADADgBQAGAAACgGQACgEgCgDQgBgDgGgEIgLgIQgHgFgDgHQgCgHADgHIAGgHQAEgEAEAAQAEgCAFABQAHABAGACIAMAHQAHAFACAEIgGAMIAAAAIgIgKQgGgGgGgCQgGgDgHABQgDAAgCAFQgCAFACADQABADAEAEIANAHQAHAGADAGQACAHgDAHQgEAKgLACIgHABQgGAAgKgEg");
	this.shape_2.setTransform(-38.8,-4.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1D1D1C").s().p("AgOAlQgOgGgGgOQgEgOAHgPQAHgRAMgGQAMgHAOAGQAPAGAFAOQAFAOgHAPQgHARgNAGQgGAEgGAAQgGAAgIgDgAgGgZQgIAFgFANQgGAMADAJQACAJAKAEQAKADAGgEQAJgFAFgNQAFgNgDgIQgCgJgKgEIgIgBQgDAAgFACg");
	this.shape_3.setTransform(-46.1,-7.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#1D1D1C").s().p("AgWAtIAYhFIAMAFIgYBFgAAGgkIAEgNIAOAFIgFAMg");
	this.shape_4.setTransform(-51.4,-10.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#1D1D1C").s().p("AAFAoQgFAAgHgCQgSgHgGgNQgHgNAGgQQAGgRANgIQANgHAOAFQAPAGAFALQAFAKgGAPIgCAGIgzgQQgCAGAAAFQABAGACADQACAFAEADQAFADAFACQAFADAJgBQAHAAAFgCIABAAIgFANIgHABIgHgBgAgGgbQgIAEgDAIIAoAOQADgKgDgHQgDgHgKgDIgJgBQgDAAgEACg");
	this.shape_5.setTransform(-57.6,-11.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#1D1D1C").s().p("AAiAwIANgyQABgFgBgDQgBgDgCgCQgCgCgGgCQgFgBgGABIgMAEIgCAIIgLAtIgMgDIALgoIABgJIAAgIQAAgDgCgDQgDgCgFgBQgEgCgGABIgMAEIgPA2IgMgEIAThIIANADIgDAJQAIgEAGAAQAHgCAGACQAFABAFAGQAEADACAIQAJgGAHAAQAGgBAIABQAMADAEAKQADAIgDAMIgNAvg");
	this.shape_6.setTransform(-68.5,-14.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#1D1D1C").s().p("AgJAmQgIgCgHgEIgKgHIAEgOIAAAAQAEAGAIAFQAGAEAGACQAHACAFgCQAGgBABgGQABgFgCgCQgCgDgHgDIgMgHQgJgDgDgGQgCgHABgGIAEgJQADgDAFgCIAKgDIALABQAJACAFADQAFADAFAEIgDANIgBAAQgEgFgGgEQgGgEgHgBQgGgCgEABQgFACgCAFQgBAFACADQADADAFADIANAGQAIADAEAFQADAGgCAJQgCAKgKAEQgGACgHAAIgKgBg");
	this.shape_7.setTransform(-11.2,-80.7,1,1,6.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#1D1D1C").s().p("AgOAxIANhJIALACIgLBJgAAAglIABgNIAOACIgCANg");
	this.shape_8.setTransform(-16.1,-83.8,1,1,6.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#1D1D1C").s().p("AgEAnQgJgBgGgCIgLgGIABgOIABAAQAHAGAGACQAGAEAIABQAGABAFgDQAFgCABgGQAAgEgCgDQgCgDgIgCIgMgFQgKgCgEgFQgDgGAAgHIADgJQACgDAFgDQAEgDAGgBQAFgCAGABIAOADQAIADADACIgBAOIgBAAQgFgEgGgDQgIgEgGAAQgEgBgGACQgFADAAAFQgBAEADADQADADAGACIAFACIAHADQAKABAEAFQAEAGgBAIQgBAKgJAGQgIAEgLAAIgEAAg");
	this.shape_9.setTransform(-22.1,-84,1,1,6.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#1D1D1C").s().p("AgYAdQgKgLAAgSQAAgSAKgKQAJgLAPAAQAPAAAKALQAKALAAARQAAASgKALQgJALgQAAQgOAAgKgLgAgPgVQgFAHAAAOQAAAOAGAHQAFAIAJAAQALAAAFgIQAGgHAAgOQgBgOgFgHQgGgHgKAAQgJAAgGAHg");
	this.shape_10.setTransform(-30,-85.3,1,1,6.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#1D1D1C").s().p("AgHgXIALgBIAHBKIgLABgAgKgxIAMgBIABANIgMACg");
	this.shape_11.setTransform(-36.2,-87.1,1,1,6.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#1D1D1C").s().p("AgSAiQgNgJgDgSQgEgQAIgNQAIgNAQgDQANgDAKAHQAKAHADARIACAHIg1AIQAAAGAEAGQAEAGADABQAEADAGABIAIgBQAIgBAHgFIAKgIIABAAIACAOIgMAHQgGADgHABIgLACQgKAAgIgGgAgEgbQgLABgEAIQgFAGABAKIApgIQgCgKgGgFQgFgDgFAAIgEABg");
	this.shape_12.setTransform(-42.2,-85.7,1,1,6.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#1D1D1C").s().p("AhAgRIAMgEIADAIIAJgMQADgEAHgDQAIgCAGAAQAGACAFAEQAFgKADgEQAFgFAGgDQAMgEAIAFQAJAFAFANIARAsIgMAEIgTgvQgCgEgCgCQgDgCgEgBQgDAAgFACQgFACgEAEIgGALIATAyIgMAFIgRgvQgCgFgCgBQgDgDgEAAQgDgBgFADQgFABgEAFQgDAEgEAGIAUAzIgMAFg");
	this.shape_13.setTransform(-53.5,-83.7,1,1,6.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.lf(["#FFFFFF","#D12127"],[0,1],-38.9,8.6,42.8,-15.8).s().p("AmbCSQADgJAIgTQANgfAUgdQA9hcBig0QC/hkEfBWIAUg8IB5CGIixAkIATg6QkHhPisBZQhVArg2BSQgRAagMAaIgJAWg");
	this.shape_14.setTransform(-41.1,-59.4);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.lf(["#FFFFFF","#D4C4DD","#A382B6"],[0,0.173,1],-31.5,-13.2,31,10.3).s().p("ACkBLQiWhShWgdQhJgWhbgMIhNgGIACg3IBUAHQBfANBMAXQBfAfCWBUIAeg1IBfCYIi1AGg");
	this.shape_15.setTransform(-42.5,-20.4);

	this.addChild(this.shape_15,this.shape_14,this.shape_13,this.shape_12,this.shape_11,this.shape_10,this.shape_9,this.shape_8,this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-82.3,-92.2,82.4,96.5);


(lib.CdP_Flechas_al_1 = function() {
	this.initialize();

	// Capa 1
	this.text = new cjs.Text("crecimiento", "14px Verdana");
	this.text.textAlign = "center";
	this.text.lineHeight = 14;
	this.text.lineWidth = 63;
	this.text.setTransform(-46.2,-38.6);

	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#FFFFFF","#D2C2DC","#A382B6"],[0,0.157,1],-33.7,6.1,37.2,-5.8).s().p("AltBHQCshjDAgbQCBgSBjASIAXg+IB0CJIiyAgIAVg3QhcgPh4ASQiwAZifBdg");
	this.shape.setTransform(-45.1,-11.7);

	this.addChild(this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-81.8,-38.6,73.4,38.7);


(lib.CdP_Flecha4_5 = function() {
	this.initialize();

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#FFFFFF","#D4C4DD","#A382B6"],[0,0.149,1],29.6,-17.5,-53.6,22.2).s().p("AoSgMICsg5IgMA+QCPAYCLAAQE5AAEch6IAWAyQkmB/lFAAQiUAAiSgcIgMA+g");
	this.shape.setTransform(-53,-10.6);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-106.2,-21.3,106.3,21.4);


(lib.CdP_Fase_07 = function() {
	this.initialize();

	// Capa 1
	this.text = new cjs.Text("plántula", "14px Verdana");
	this.text.textAlign = "center";
	this.text.lineHeight = 14;
	this.text.lineWidth = 65;
	this.text.setTransform(-113.8,-194.3);

	this.instance = new lib.Capa3();
	this.instance.setTransform(-140.3,-204.9,0.177,0.177);

	this.instance_1 = new lib.Capa1copia();
	this.instance_1.setTransform(-140.3,-204.9,0.177,0.177);

	this.addChild(this.instance_1,this.instance,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-146.2,-204.9,146.3,205);


(lib.CdP_Fase_06 = function() {
	this.initialize();

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#1D1D1C").ss(1.5,0,0,4).p("AAAFiIAArD");
	this.shape.setTransform(-82.5,-35.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#1D1D1C").ss(1.5,0,0,4).p("AkSAAIIlAA");
	this.shape_1.setTransform(-55.8,-70.4);

	this.instance = new lib.Capa7_4();
	this.instance.setTransform(-61.7,-122.9,0.131,0.131);

	this.instance_1 = new lib.Capa1_1();
	this.instance_1.setTransform(-61.7,-122.9,0.131,0.131);

	this.addChild(this.instance_1,this.instance,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-82.6,-122.9,82.7,123);


(lib.CdP_Fase_05 = function() {
	this.initialize();

	// Capa 1
	this.text = new cjs.Text("embrión (semilla)", "14px Verdana");
	this.text.textAlign = "center";
	this.text.lineHeight = 14;
	this.text.lineWidth = 79;
	this.text.setTransform(-136.3,-136.3);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#1D1D1C").ss(1.5,0,0,4).p("AkCAAIIFAA");
	this.shape.setTransform(-52.5,-48.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#1D1D1C").ss(1.5,0,0,4).p("AAAFiIAArD");
	this.shape_1.setTransform(-77.7,-83);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#1D1D1C").ss(1.5,0,0,4).p("AiTAAIEnAA");
	this.shape_2.setTransform(-92,-118);

	this.instance = new lib.Capa7_3();
	this.instance.setTransform(-61.7,-109.2,0.131,0.131);

	this.instance_1 = new lib.Capa6_4();
	this.instance_1.setTransform(-61.7,-108.2,0.131,0.131);

	this.addChild(this.instance_1,this.instance,this.shape_2,this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-175.9,-136.3,176,136.3);


(lib.CdP_Fase_04_5 = function() {
	this.initialize();

	// Capa 1
	this.text = new cjs.Text("cigoto", "14px Verdana");
	this.text.textAlign = "center";
	this.text.lineHeight = 14;
	this.text.lineWidth = 60;
	this.text.setTransform(-97.4,-65.3);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#1D1D1C").ss(1.5,0,0,4).p("ACyAAIljAA");
	this.shape.setTransform(-47.7,-56);

	this.instance = new lib.Capa7_2();
	this.instance.setTransform(-61.8,-108.4,0.131,0.131);

	this.instance_1 = new lib.Capa6_3();
	this.instance_1.setTransform(-61.8,-108.4,0.131,0.131);

	this.addChild(this.instance_1,this.instance,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-127.5,-108.4,127.6,108.5);


(lib.CdP_Fase_04 = function() {
	this.initialize();

	// Capa 1
	this.text = new cjs.Text("tubo polínico (gametófito   )", "14px Verdana");
	this.text.textAlign = "center";
	this.text.lineHeight = 14;
	this.text.lineWidth = 169;
	this.text.setTransform(-51,-66.8);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1D1D1C").s().p("AgtAtQgNgNAAgTQAAgQANgNQAOgOASAAQAPAAANALIAfgfIgaAAIAAgGIAngCIgCAnIgGAAIAAgaIgfAfQALAOAAANQAAATgOANQgNAOgRAAQgSAAgOgOgAgngLQgLALAAANQAAAQALALQALALAPAAQAOAAALgLQALgLAAgQQAAgNgLgLQgLgLgOAAQgPAAgLALg");
	this.shape.setTransform(-15,-43.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#1D1D1C").ss(1.5,0,0,4).p("Ak4iRIJpAAIAAEq");
	this.shape_1.setTransform(-104.1,-82.6);

	this.instance = new lib.Capa6_0_2();
	this.instance.setTransform(-184.3,-199.9,0.167,0.167);

	this.instance_1 = new lib.Capa5_2();
	this.instance_1.setTransform(-184.3,-199.9,0.167,0.167);

	this.instance_2 = new lib.Capa11_1();
	this.instance_2.setTransform(-170.1,-108.2,0.131,0.131);

	this.instance_3 = new lib.Capa8_2();
	this.instance_3.setTransform(-170.1,-108.2,0.131,0.131);

	this.instance_4 = new lib.Capa10_1();
	this.instance_4.setTransform(-170.1,-108.2,0.131,0.131);

	this.instance_5 = new lib.Capa9_1();
	this.instance_5.setTransform(-170.1,-108.2,0.131,0.131);

	this.instance_6 = new lib.Capa6_2();
	this.instance_6.setTransform(-170.1,-108.2,0.131,0.131);

	this.addChild(this.instance_6,this.instance_5,this.instance_4,this.instance_3,this.instance_2,this.instance_1,this.instance,this.shape_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-184.3,-199.9,221.9,205.2);

(lib.gametos = function() {
	this.initialize();

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1D1D1C").s().p("AgBA2IAAgRIgWAAIAAgGIAWAAIAAgWQgMgCgJgHQgIgIAAgNQAAgNAJgJQAKgJALAAQANAAAJAJQAJAJAAANQAAANgIAIQgIAHgNACIAAAWIAWAAIAAAGIgWAAIAAARgAgRgnQgHAHAAALQAAAKAHAIQAIAFAJAAQAKAAAIgFQAHgIAAgKQAAgLgHgHQgIgIgKAAQgJAAgIAIg");
	this.shape.setTransform(308,214,1.5,1.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1D1D1C").s().p("AgTBDIAAgBIALgLQAGgJACgGQADgJACgKQADgIAAgNQAAgLgDgJQgCgLgDgHQgEgKgEgFQgGgHgFgFIAAgBIAPAAQALAOAGARQAHAQAAATQAAAVgHAQQgGARgLANg");
	this.shape_1.setTransform(317.3,214.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#1D1D1C").s().p("AgRAmIgLgFIAAgOIABAAQAFAEAIADQAIACAGABQAGgBAFgCQAFgDAAgGQAAgEgCgCQgDgDgIgCIgMgDQgLgCgEgEQgEgFAAgHQAAgGACgDQACgEAEgDQADgEAHgCQAFgCAGAAQAHABAHABIALAEIAAAOIAAAAQgEgEgIgCQgIgDgGAAQgFAAgFADQgFACAAAGQAAAFADACQADACAHACIAMADQAJACAGADQAEAGAAAHQAAAMgJAFQgIAIgNgBQgJAAgHgBg");
	this.shape_2.setTransform(294.1,214.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1D1D1C").s().p("AgYAdQgKgLAAgSQAAgSAKgKQAJgLAPAAQAQAAAJALQAKALAAARQAAARgKAMQgJALgQAAQgOAAgKgLgAgPgUQgGAHAAANQAAAPAGAGQAGAIAJAAQAKAAAGgHQAFgIAAgOQAAgNgFgHQgGgIgKAAQgJAAgGAIg");
	this.shape_3.setTransform(286.1,214.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#1D1D1C").s().p("AgIArQgGgGAAgOIAAgnIgJAAIAAgLIAJAAIAAgVIANAAIAAAVIAZAAIAAALIgZAAIAAAqIABAHIADAEQADABAFAAIAHgBIAFgBIABAAIAAALIgQACQgKAAgGgGg");
	this.shape_4.setTransform(279.2,213.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#1D1D1C").s().p("AgXAdQgKgKAAgTQAAgRAKgLQALgLAOAAQAPAAAJAJQAIAJAAARIAAAFIg2AAQAAAIACAEQACAGAEADQADADAFACQAEABAFAAQAIAAAHgDQAIgCAEgEIAAAAIAAAOIgMAFQgKACgFAAQgRAAgLgLgAgNgWQgGAGgBAJIApAAQAAgKgEgGQgGgFgJAAQgJAAgGAGg");
	this.shape_5.setTransform(272.2,214.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#1D1D1C").s().p("AAqAnIAAgzQAAgFgCgCQgBgDgDgCQgDgBgGAAQgGAAgFACIgLAHIABAEIAAAzIgLAAIAAgzIgCgIQgCgCgDgCQgDgBgFAAQgGAAgFACIgKAHIAAA3IgNAAIAAhLIANAAIAAAJIAMgIQAGgDAGAAQAJAAAFAEQADADADAGQAGgGAIgEQAHgDAHAAQAMAAAGAIQAGAIAAANIAAAwg");
	this.shape_6.setTransform(261.2,214.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#1D1D1C").s().p("AgYAhQgHgHAAgLQAAgIADgFQAEgEAHgDQAIgDAJgBIATgCIAAgCQAAgEgCgDQgBgDgDgBQgDgCgEgBIgGgBIgLACIgMAEIgBAAIAAgNIALgDIANgBIANABQAGACAEAEQAFACACAGQACAEAAAIIAAAyIgNAAIAAgIIgKAGIgHADIgIAAQgLAAgHgGgAAFAAIgKABQgGABgDADQgEAEAAAFQAAAHAEADQAFAEAHAAQAGAAAEgDIALgGIAAgUg");
	this.shape_7.setTransform(250,214.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#1D1D1C").s().p("AgNA0IgLgCIAAgNIAAAAIAKADQAHACAHAAQAFAAAEgCQAFgBACgDIADgHIABgIIAAgHQgFAEgGADQgGACgGAAQgNAAgIgKQgIgJAAgRQAAgJADgIQACgGAFgGQAFgFAGgCQAHgDAEAAQAGAAAFABIAJAEIABgDIAMAAIAABCQAAATgIAJQgKAJgQAAgAgNghQgGAHAAANQAAAMAFAGQAEAGAKAAQAEAAAGgCIAKgGIAAgnIgJgEIgJgBQgIAAgHAIg");
	this.shape_8.setTransform(241.4,216);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#1D1D1C").s().p("AAFBDQgLgOgGgQQgHgQAAgVQAAgTAHgQQAGgQALgPIAPAAIAAABIgKAMQgFAFgFAKQgCAKgCAIQgDAMAAAIQAAAKADALIAEATQAFAJAFAGIAKALIAAABg");
	this.shape_9.setTransform(234.2,214.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#1D1D1C").s().p("AgTBDIAAgBIALgLQAFgHADgIQACgHAEgMQACgLAAgKQAAgIgCgMQgEgNgCgFIgIgPQgGgIgFgEIAAgBIAQAAQAJAOAHARQAHARAAASQAAAUgHARQgHARgJANg");
	this.shape_10.setTransform(318.2,184.6);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#1D1D1C").s().p("AgsAtQgOgNAAgTQAAgQAOgNQANgOASAAQAQAAAMALIAfgfIgaAAIAAgGIAngCIgCAnIgGAAIAAgaIgfAfQALANAAAOQAAATgOANQgNAOgRAAQgSAAgNgOgAgngLQgLALAAANQAAAQALALQALALAPAAQAOAAALgLQALgLAAgQQAAgNgLgLQgLgLgOAAQgPAAgLALg");
	this.shape_11.setTransform(308.1,184.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#1D1D1C").s().p("AgQAlIgMgEIAAgPIAAAAIAOAIQAIACAGAAQAGAAAGgCQAEgDAAgGQAAgEgCgDQgDgCgHgCIgFgBIgIgCQgKgCgFgDQgEgGAAgIQAAgFACgDQACgEAEgDQAEgEAGgCQAFgBAGAAQAHgBAHACIALAEIAAAOIAAAAIgMgHQgIgCgGAAQgFAAgFADQgFACAAAGQAAAFADACQAEADAFABIAOADQAIACAGADQAEAFAAAIQAAAMgIAGQgJAGgNABQgJAAgGgDg");
	this.shape_12.setTransform(292.6,184.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#1D1D1C").s().p("AgYAdQgKgLAAgSQAAgSAKgKQAJgLAPAAQAQAAAJALQAKALAAARQAAASgKALQgJALgQAAQgPAAgJgLgAgPgUQgGAHAAANQAAAPAGAGQAGAIAJAAQAKAAAFgHQAGgIAAgOQAAgNgGgHQgFgIgKAAQgJAAgGAIg");
	this.shape_13.setTransform(284.7,184.7);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#1D1D1C").s().p("AgHArQgHgGAAgOIAAgnIgJAAIAAgLIAJAAIAAgVIANAAIAAAVIAYAAIAAALIgYAAIABAqQAAAEAAADIADAEQADABAFAAIAHgBIAFgBIAAAAIAAALIgHACIgIAAQgKAAgFgGg");
	this.shape_14.setTransform(277.7,183.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#1D1D1C").s().p("AgWAdQgLgLAAgSQAAgQAKgMQALgLAOAAQAQAAAIAJQAIAKAAAQIAAAFIg2AAQAAAIACAEQADAHADACQADADAFACIAJABQAIAAAIgDQAHgCAEgEIABAAIAAAOIgNAFQgJACgGAAQgRAAgKgLgAgNgWQgGAGgBAJIAqAAQAAgKgFgGQgGgFgKAAQgIAAgGAGg");
	this.shape_15.setTransform(270.7,184.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#1D1D1C").s().p("AAqAnIAAgzQAAgEgCgDQgCgDgDgCQgDgBgFAAQgGAAgFACIgLAHIABAEIAAAzIgLAAIAAgzIgCgIQgCgCgDgCQgDgBgFAAQgGAAgFACIgKAHIAAA3IgNAAIAAhLIANAAIAAAJIAMgIQAGgDAGAAQAIAAAGAEQADADADAGQAGgGAIgEQAHgDAHAAQAMAAAGAIQAGAIAAANIAAAwg");
	this.shape_16.setTransform(259.8,184.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#1D1D1C").s().p("AgYAhQgHgGAAgMQAAgIAEgGQAEgDAGgDQAJgDAIgBIATgCIAAgCQAAgEgBgDQgCgDgDgCIgGgCIgHgBIgLACIgMAEIgBAAIAAgNIALgCIANgBIANABQAGABAEADQAFAEACAEQACAFAAAIIAAAxIgNAAIAAgHIgKAGIgHADIgIABQgLAAgHgHgAAFAAIgKAAQgGACgDAEQgEACAAAHQAAAFAEAEQAEADAIAAQAGAAAFgCIAKgGIAAgTg");
	this.shape_17.setTransform(248.5,184.7);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#1D1D1C").s().p("AgNA0IgLgCIAAgNIAAAAIAKADQAHACAHAAQAFAAAEgCQAEgBADgDQACgDABgEIABgIIAAgHQgEAEgHADQgGACgGAAQgNAAgIgKQgIgJAAgRQAAgIACgJQAEgGAEgGQAEgFAHgCQAGgDAFAAQAGAAAFABIAJAEIABgDIAMAAIAABCQAAATgIAJQgKAJgQAAgAgNghQgGAHAAANQAAANAEAFQAFAGAKAAQAEAAAGgCQAGgCAEgEIAAgnIgJgEIgJgBQgIAAgHAIg");
	this.shape_18.setTransform(239.9,186);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#1D1D1C").s().p("AAFBDQgLgNgGgRQgHgQAAgVQAAgTAHgQQAGgRALgOIAPAAIAAABQgGAGgFAGQgEAFgFAKQgCAKgCAIQgDAJAAALQAAANADAIQACAKACAJQAFAJAEAGIALALIAAABg");
	this.shape_19.setTransform(232.8,184.6);

	this.addChild(this.shape_19,this.shape_18,this.shape_17,this.shape_16,this.shape_15,this.shape_14,this.shape_13,this.shape_12,this.shape_11,this.shape_10,this.shape_9,this.shape_8,this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(230.7,177.9,89.6,44.2);

(lib.CdP_Fase_03 = function() {
	this.initialize();

	// Capa 1
	this.text = new cjs.Text("saco embrionario (gametófito   )", "14px Verdana");
	this.text.textAlign = "center";
	this.text.lineHeight = 14;
	this.text.lineWidth = 148;
	this.text.setTransform(-30.7,-29.2);

    this.texta = new lib.gametos()
	this.texta.setTransform(-440.7,-320);

this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#1D1D1C").s().p("AgBA2IAAgRIgWAAIAAgGIAWAAIAAgWQgMgCgJgHQgIgIAAgNQAAgNAJgJQAKgJALAAQANAAAJAJQAJAJAAANQAAANgIAIQgIAHgNACIAAAWIAWAAIAAAGIgWAAIAAARgAgRgnQgHAHAAALQAAAKAHAIQAIAFAJAAQAKAAAIgFQAHgIAAgKQAAgLgHgHQgIgIgKAAQgJAAgIAIg");
	this.shape_20.setTransform(10,-6.7,1.5,1.5);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#1D1D1C").ss(1.5,0,0,4).p("ADnAAInNAA");
	this.shape_21.setTransform(-88,-103.6);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#1D1D1C").ss(1.5,0,0,4).p("ADnAAInNAA");
	this.shape_22.setTransform(-87.5,-133.1);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#1D1D1C").ss(1.5,0,0,4).p("AAAiuIAAFd");
	this.shape_23.setTransform(-53.1,-60.8);

	this.instance = new lib.Capa7_1();
	this.instance.setTransform(-111.8,-273.5,0.167,0.167);

	this.instance_1 = new lib.Capa6_0_1();
	this.instance_1.setTransform(-111.8,-273.5,0.167,0.167);

	this.instance_2 = new lib.Capa5_1();
	this.instance_2.setTransform(-111.8,-273.5,0.167,0.167);

	this.instance_3 = new lib.Capa8_1();
	this.instance_3.setTransform(-97.8,-153.8,0.131,0.131);

	this.instance_4 = new lib.Capa10();
	this.instance_4.setTransform(-97.8,-153.8,0.131,0.131);

	this.instance_5 = new lib.Capa9();
	this.instance_5.setTransform(-97.8,-153.8,0.131,0.131);

	this.instance_6 = new lib.Capa6_1();
	this.instance_6.setTransform(-97.8,-153.8,0.131,0.131);

	this.addChild(this.instance_6,this.instance_5,this.instance_4,this.instance_3,this.instance_2,this.instance_1,this.instance,this.shape_23,this.shape_22,this.shape_21,this.text,this.texta,this.textb,this.shape_20);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-201.5,-273.5,248.6,316.3);


(lib.CdP_Fase_02 = function() {
	this.initialize();

	// Capa 1
	this.text = new cjs.Text(" (esporas   )", "14px Verdana");
	this.text.textAlign = "center";
	this.text.lineHeight = 14;
	this.text.lineWidth = 134;
	this.text.setTransform(-187.9,-43.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1D1D1C").s().p("AgBA2IAAgRIgWAAIAAgGIAWAAIAAgWQgMgCgJgHQgIgIAAgNQAAgNAJgJQAKgJALAAQANAAAJAJQAJAJAAANQAAANgIAIQgIAHgNACIAAAWIAWAAIAAAGIgWAAIAAARgAgRgnQgHAHAAALQAAAKAHAIQAIAFAJAAQAKAAAIgFQAHgIAAgKQAAgLgHgHQgIgIgKAAQgJAAgIAIg");
	this.shape.setTransform(-158.9,-35.3,1.5,1.5);

	this.text_1 = new cjs.Text("grano de polen (espora   )", "14px Verdana");
	this.text_1.textAlign = "center";
	this.text_1.lineHeight = 14;
	this.text_1.lineWidth = 134;
	this.text_1.setTransform(-49.4,-156.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1D1D1C").s().p("AgtAtQgNgNAAgTQAAgQANgNQAOgOASAAQAQAAAMALIAfgfIgaAAIAAgGIAngCIgCAnIgGAAIAAgaIgfAfQALANAAAOQAAATgOANQgNAOgRAAQgSAAgOgOgAgngLQgLALAAANQAAAQALALQALALAPAAQAOAAALgLQALgLAAgQQAAgNgLgLQgLgLgOAAQgPAAgLALg");
	this.shape_1.setTransform(-25.4,-134.8);

	this.instance = new lib.Capa8();
	this.instance.setTransform(-149.2,-155.5,0.167,0.167);

	this.instance_1 = new lib.Capa7();
	this.instance_1.setTransform(-149.2,-155.5,0.167,0.167);

	this.instance_2 = new lib.Capa6_0();
	this.instance_2.setTransform(-149.2,-155.5,0.167,0.167);

	this.instance_3 = new lib.Capa5();
	this.instance_3.setTransform(-149.2,-155.5,0.167,0.167);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#1D1D1C").ss(1.5,0,0,4).p("ACOhjIAADAIkjAA");
	this.shape_2.setTransform(-129.9,-43.3);

	this.instance_4 = new lib.Capa11();
	this.instance_4.setTransform(-149.9,-108.2,0.131,0.131);

	this.instance_5 = new lib.Capa6();
	this.instance_5.setTransform(-149.9,-108.2,0.131,0.131);

	this.addChild(this.instance_5,this.instance_4,this.shape_2,this.instance_3,this.instance_2,this.instance_1,this.instance,this.shape_1,this.text_1,this.shape,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-255,-156.7,276.8,156.8);


(lib.CdP_Fase_01 = function() {
	this.initialize();

	// Capa 1
	this.text = new cjs.Text("esporófito \nplanta adulta\n", "14px Verdana");
	this.text.textAlign = "right";
	this.text.lineHeight = 14;
	this.text.lineWidth = 95;
	this.text.setTransform(-84,-64.1);

	this.text_1 = new cjs.Text("estambre \n(esporangio   )", "14px Verdana");
	this.text_1.textAlign = "right";
	this.text_1.lineHeight = 14;
	this.text_1.lineWidth = 113;
	this.text_1.setTransform(-139.9,-329.4);

	this.text_2 = new cjs.Text("pistilo (esporangio   )", "14px Verdana");
	this.text_2.textAlign = "center";
	this.text_2.lineHeight = 14;
	this.text_2.lineWidth = 118;
	this.text_2.setTransform(-120.3,-522.1);

	this.text_3 = new cjs.Text("flor", "14px Verdana");
	this.text_3.textAlign = "center";
	this.text_3.lineHeight = 14;
	this.text_3.lineWidth = 70;
	this.text_3.setTransform(-204.2,-392.6);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1D1D1C").s().p("AgtAtQgNgNAAgTQAAgQANgOQAOgNASAAQAPAAANALIAfgfIgaAAIAAgGIAngCIgCAnIgGAAIAAgbIgfAgQALANAAAOQAAATgOANQgNAOgRAAQgSAAgOgOgAgngLQgLALAAANQAAAQALALQALALAPAAQAOAAALgLQALgLAAgQQAAgNgLgLQgLgLgOAAQgPAAgLALg");
	this.shape.setTransform(-150.1,-307);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1D1D1C").s().p("AgBA2IAAgRIgWAAIAAgGIAWAAIAAgWQgMgCgJgHQgIgIAAgNQAAgNAJgJQAKgJALAAQANAAAJAJQAJAJAAANQAAANgIAIQgIAHgNACIAAAWIAWAAIAAAGIgWAAIAAARgAgRgnQgHAHAAALQAAAKAHAIQAIAFAJAAQAKAAAIgFQAHgIAAgKQAAgLgHgHQgIgIgKAAQgJAAgIAIg");
	this.shape_1.setTransform(-80,-500.4,1.5,1.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#1D1D1C").ss(1.5,0,0,4).p("AAzGyQgaAHgZg0QgyhmAAkfQAAjPAyiGQAQgqATgeQAJgOAHgH");
	this.shape_2.setTransform(-167.9,-386.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#1D1D1C").ss(1.5,0,0,4).p("AAAmEIAAMK");
	this.shape_3.setTransform(-117.3,-453.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#1D1D1C").ss(1.5,0,0,4).p("AAAl5IAALz");
	this.shape_4.setTransform(-146.6,-368.9);

	this.instance = new lib.Capa1();
	this.instance.setTransform(-262.7,-459.9,0.278,0.278);

	this.addChild(this.instance,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape,this.text_3,this.text_2,this.text_1,this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-262.7,-522.1,262.8,522.2);


(lib.CdP_Esquirol = function() {
	this.initialize();

	// Capa 1
	this.instance = new lib._0028LZ01();
	this.instance.setTransform(-445.2,-456.1,0.617,0.617);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-445.2,-456.1,375.1,375.1);


(lib.CdP_DentLleo = function() {
	this.initialize();

	// Capa 1
	this.instance = new lib._000TT901();
	this.instance.setTransform(-425,-455.6,0.499,0.612);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EgyNAv7MAAAhf1MBkbAAAMAAABf1g");
	this.shape.setTransform(-321.4,-304,1,0.991);

	this.addChild(this.shape,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-642.9,-607.9,643,607.8);


(lib.CdP_Abeja = function() {
	this.initialize();

	// Capa 1
	this.instance = new lib._0016G701();
	this.instance.setTransform(-421.6,-457.3,0.678,0.622);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EgrQAvVMAAAhepMBWhAAAMAAABepg");
	this.shape.setTransform(-276.9,-304.9);

	this.addChild(this.shape,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-553.9,-607.9,554,606);


(lib.btn_siguiente = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhviXIDfCXIjfCYg");
	this.shape.setTransform(3.6,0,0.673,0.673);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgvBWIAAirIBgAAIAACrg");
	this.shape_1.setTransform(-6.4,0,0.673,0.673);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#1E120D").ss(1,0,1).p("ADeCiQAAAZgRASQgSARgZAAIlDAAQgZAAgSgRQgRgSAAgZIAAlDQAAgZARgSQASgRAZAAIFDAAQAZAAASARQARASAAAZg");
	this.shape_2.setTransform(0,0,0.673,0.673);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1E120D").s().p("AihDeQgZAAgSgRQgRgSAAgZIAAlDQAAgZARgSQASgRAZAAIFDAAQAZAAASARQARASAAAZIAAFDQAAAZgRASQgSARgZAAg");
	this.shape_3.setTransform(0,0,0.673,0.673);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3,p:{scaleX:0.673,scaleY:0.673}},{t:this.shape_2,p:{scaleX:0.673,scaleY:0.673}},{t:this.shape_1,p:{scaleX:0.673,scaleY:0.673,x:-6.4}},{t:this.shape,p:{scaleX:0.673,scaleY:0.673,x:3.6}}]}).to({state:[{t:this.shape_3,p:{scaleX:0.741,scaleY:0.741}},{t:this.shape_2,p:{scaleX:0.741,scaleY:0.741}},{t:this.shape_1,p:{scaleX:0.741,scaleY:0.741,x:-7.1}},{t:this.shape,p:{scaleX:0.741,scaleY:0.741,x:3.9}}]},1).to({state:[{t:this.shape_3,p:{scaleX:0.673,scaleY:0.673}},{t:this.shape_2,p:{scaleX:0.673,scaleY:0.673}},{t:this.shape_1,p:{scaleX:0.673,scaleY:0.673,x:-6.4}},{t:this.shape,p:{scaleX:0.673,scaleY:0.673,x:3.6}}]},1).to({state:[{t:this.shape_3,p:{scaleX:0.673,scaleY:0.673}},{t:this.shape_2,p:{scaleX:0.673,scaleY:0.673}},{t:this.shape_1,p:{scaleX:0.673,scaleY:0.673,x:-6.4}},{t:this.shape,p:{scaleX:0.673,scaleY:0.673,x:3.6}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.9,-14.9,30,30);


(lib.btn_inicio = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// FlashAICB
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ah9CQIAAioIg3ABIC0h4IC1B4Ig1gBIAACnIhPAAIAAiZIhgAAIAACag");
	this.shape.setTransform(0,0,0.673,0.673);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#1E120D").ss(1,0,1).p("ADfCjQAAAZgSARQgRASgZAAIlFAAQgYAAgSgSQgSgRAAgZIAAlFQAAgYASgSQASgSAYAAIFFAAQAZAAARASQASASAAAYg");
	this.shape_1.setTransform(0,0,0.673,0.673);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#1E120D").s().p("AiiDeQgYAAgSgRQgRgSAAgZIAAlEQAAgYARgSQASgRAYAAIFEAAQAZAAASARQARASAAAYIAAFEQAAAZgRASQgSARgZAAg");
	this.shape_2.setTransform(0,0,0.673,0.673);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2,p:{scaleX:0.673,scaleY:0.673}},{t:this.shape_1,p:{scaleX:0.673,scaleY:0.673}},{t:this.shape,p:{scaleX:0.673,scaleY:0.673}}]}).to({state:[{t:this.shape_2,p:{scaleX:0.74,scaleY:0.74}},{t:this.shape_1,p:{scaleX:0.74,scaleY:0.74}},{t:this.shape,p:{scaleX:0.74,scaleY:0.74}}]},1).to({state:[{t:this.shape_2,p:{scaleX:0.673,scaleY:0.673}},{t:this.shape_1,p:{scaleX:0.673,scaleY:0.673}},{t:this.shape,p:{scaleX:0.673,scaleY:0.673}}]},1).to({state:[{t:this.shape_2,p:{scaleX:0.673,scaleY:0.673}},{t:this.shape_1,p:{scaleX:0.673,scaleY:0.673}},{t:this.shape,p:{scaleX:0.673,scaleY:0.673}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.9,-14.9,30,30);


(lib.btn_anterior = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Capa 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhviXIDfCXIjfCYg");
	this.shape.setTransform(-3.5,0,0.673,0.673,180);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgvBWIAAirIBgAAIAACrg");
	this.shape_1.setTransform(6.5,0.1,0.673,0.673,180);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#1E120D").ss(1,0,1).p("ADeCiQAAAZgRASQgSARgZAAIlDAAQgZAAgSgRQgRgSAAgZIAAlDQAAgZARgSQASgRAZAAIFDAAQAZAAASARQARASAAAZg");
	this.shape_2.setTransform(0,0,0.673,0.673,180);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1E120D").s().p("AihDeQgZAAgSgRQgRgSAAgZIAAlDQAAgZARgSQASgRAZAAIFDAAQAZAAASARQARASAAAZIAAFDQAAAZgRASQgSARgZAAg");
	this.shape_3.setTransform(0,0,0.673,0.673,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3,p:{scaleX:0.673,scaleY:0.673}},{t:this.shape_2,p:{scaleX:0.673,scaleY:0.673}},{t:this.shape_1,p:{scaleX:0.673,scaleY:0.673,x:6.5}},{t:this.shape,p:{scaleX:0.673,scaleY:0.673,x:-3.5}}]}).to({state:[{t:this.shape_3,p:{scaleX:0.741,scaleY:0.741}},{t:this.shape_2,p:{scaleX:0.741,scaleY:0.741}},{t:this.shape_1,p:{scaleX:0.741,scaleY:0.741,x:7.2}},{t:this.shape,p:{scaleX:0.741,scaleY:0.741,x:-3.8}}]},1).to({state:[{t:this.shape_3,p:{scaleX:0.673,scaleY:0.673}},{t:this.shape_2,p:{scaleX:0.673,scaleY:0.673}},{t:this.shape_1,p:{scaleX:0.673,scaleY:0.673,x:6.5}},{t:this.shape,p:{scaleX:0.673,scaleY:0.673,x:-3.5}}]},1).to({state:[{t:this.shape_3,p:{scaleX:0.673,scaleY:0.673}},{t:this.shape_2,p:{scaleX:0.673,scaleY:0.673}},{t:this.shape_1,p:{scaleX:0.673,scaleY:0.673,x:6.5}},{t:this.shape,p:{scaleX:0.673,scaleY:0.673,x:-3.5}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.9,-14.9,30,30);


(lib.CdP_Llavors = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,false,{});

	// Mascara (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AyfhWIAAq+IIKAAIAAK+g");
	var mask_graphics_1 = new cjs.Graphics().p("AykhNIAArGIIdAAIAALGg");
	var mask_graphics_2 = new cjs.Graphics().p("AyphFIAArNIIwAAIAALNg");
	var mask_graphics_3 = new cjs.Graphics().p("Aytg9IAArUIJDAAIAALUg");
	var mask_graphics_4 = new cjs.Graphics().p("Ayyg0IAArdIJWAAIAALdg");
	var mask_graphics_5 = new cjs.Graphics().p("Ay3gsIAArkIJpAAIAALkg");
	var mask_graphics_6 = new cjs.Graphics().p("Ay7gkIAArrIJ7AAIAALrg");
	var mask_graphics_7 = new cjs.Graphics().p("AzAgcIAAryIKOAAIAALyg");
	var mask_graphics_8 = new cjs.Graphics().p("AzEgTIAAr6IKgAAIAAL6g");
	var mask_graphics_9 = new cjs.Graphics().p("AzJgLIAAsBIK0AAIAAMBg");
	var mask_graphics_10 = new cjs.Graphics().p("AzOgDIAAsJILHAAIAAMJg");
	var mask_graphics_11 = new cjs.Graphics().p("AzSAEIAAsPILZAAIAAMPg");
	var mask_graphics_12 = new cjs.Graphics().p("AzXAMIAAsWILsAAIAAMWg");
	var mask_graphics_13 = new cjs.Graphics().p("AzbAUIAAsdIL+AAIAAMdg");
	var mask_graphics_14 = new cjs.Graphics().p("AzgAcIAAskIMRAAIAAMkg");
	var mask_graphics_15 = new cjs.Graphics().p("AzlAlIAAssIMlAAIAAMsg");
	var mask_graphics_16 = new cjs.Graphics().p("AzpAtIAAszIM3AAIAAMzg");
	var mask_graphics_17 = new cjs.Graphics().p("AzuA1IAAs7INKAAIAAM7g");
	var mask_graphics_18 = new cjs.Graphics().p("AzyA+IAAtDINcAAIAANDg");
	var mask_graphics_19 = new cjs.Graphics().p("Az3BGIAAtKINvAAIAANKg");
	var mask_graphics_20 = new cjs.Graphics().p("Az8BOIAAtRIOCAAIAANRg");
	var mask_graphics_21 = new cjs.Graphics().p("A0ABWIAAtYIOVAAIAANYg");
	var mask_graphics_22 = new cjs.Graphics().p("A0FBfIAAtgIOoAAIAANgg");
	var mask_graphics_23 = new cjs.Graphics().p("A0JBnIAAtoIO6AAIAANog");
	var mask_graphics_24 = new cjs.Graphics().p("A0OBvIAAtvIPNAAIAANvg");
	var mask_graphics_25 = new cjs.Graphics().p("A0TB3IAAt2IPgAAIAAN2g");
	var mask_graphics_26 = new cjs.Graphics().p("A0XCAIAAt+IPyAAIAAN+g");
	var mask_graphics_27 = new cjs.Graphics().p("A0cCIIAAuFIQGAAIAAOFg");
	var mask_graphics_28 = new cjs.Graphics().p("A0gCQIAAuMIQYAAIAAOMg");
	var mask_graphics_29 = new cjs.Graphics().p("A0lCZIAAuUIQrAAIAAOUg");
	var mask_graphics_30 = new cjs.Graphics().p("A0qChIAAucIQ+AAIAAOcg");
	var mask_graphics_31 = new cjs.Graphics().p("A0uCpIAAujIRQAAIAAOjg");
	var mask_graphics_32 = new cjs.Graphics().p("A0zCxIAAuqIRkAAIAAOqg");
	var mask_graphics_33 = new cjs.Graphics().p("A03C6IAAuyIR2AAIAAOyg");
	var mask_graphics_34 = new cjs.Graphics().p("A08DCIAAu5ISJAAIAAO5g");
	var mask_graphics_35 = new cjs.Graphics().p("A1BDKIAAvAIScAAIAAPAg");
	var mask_graphics_36 = new cjs.Graphics().p("A1FDTIAAvJISuAAIAAPJg");
	var mask_graphics_37 = new cjs.Graphics().p("A1KDbIAAvQITBAAIAAPQg");
	var mask_graphics_38 = new cjs.Graphics().p("A1ODjIAAvXITUAAIAAPXg");
	var mask_graphics_39 = new cjs.Graphics().p("A1TDrIAAveITnAAIAAPeg");
	var mask_graphics_40 = new cjs.Graphics().p("A1YD0IAAvmIT6AAIAAPmg");
	var mask_graphics_41 = new cjs.Graphics().p("A1cD8IAAvtIUMAAIAAPtg");
	var mask_graphics_42 = new cjs.Graphics().p("A1hEEIAAv1IUfAAIAAP1g");
	var mask_graphics_43 = new cjs.Graphics().p("A1lENIAAv9IUxAAIAAP9g");
	var mask_graphics_44 = new cjs.Graphics().p("A1qEVIAAwEIVFAAIAAQEg");
	var mask_graphics_45 = new cjs.Graphics().p("A1vEdIAAwLIVYAAIAAQLg");
	var mask_graphics_46 = new cjs.Graphics().p("A1zElIAAwSIVqAAIAAQSg");
	var mask_graphics_47 = new cjs.Graphics().p("A14EuIAAwaIV7AAIAAQag");
	var mask_graphics_48 = new cjs.Graphics().p("A18E2IAAwhIWNAAIAAQhg");
	var mask_graphics_49 = new cjs.Graphics().p("A2BE+IAAwpIWgAAIAAQpg");
	var mask_graphics_50 = new cjs.Graphics().p("A2GFGIAAwwIW0AAIAAQwg");
	var mask_graphics_51 = new cjs.Graphics().p("A2KFPIAAw4IXGAAIAAQ4g");
	var mask_graphics_52 = new cjs.Graphics().p("A2PFXIAAw/IXZAAIAAQ/g");
	var mask_graphics_53 = new cjs.Graphics().p("A2TFfIAAxGIXrAAIAARGg");
	var mask_graphics_54 = new cjs.Graphics().p("A2YFoIAAxOIX+AAIAAROg");
	var mask_graphics_55 = new cjs.Graphics().p("A2dFwIAAxWIYRAAIAARWg");
	var mask_graphics_56 = new cjs.Graphics().p("A2hF4IAAxdIYkAAIAARdg");
	var mask_graphics_57 = new cjs.Graphics().p("A2mGAIAAxkIY3AAIAARkg");
	var mask_graphics_58 = new cjs.Graphics().p("A2qGJIAAxsIZJAAIAARsg");
	var mask_graphics_59 = new cjs.Graphics().p("A2vGRIAAxzIZcAAIAARzg");
	var mask_graphics_60 = new cjs.Graphics().p("A20GZIAAx6IZvAAIAAR6g");
	var mask_graphics_61 = new cjs.Graphics().p("A24GiIAAyCIaCAAIAASCg");
	var mask_graphics_62 = new cjs.Graphics().p("A29GqIAAyKIaVAAIAASKg");
	var mask_graphics_63 = new cjs.Graphics().p("A3BGyIAAyRIanAAIAASRg");
	var mask_graphics_64 = new cjs.Graphics().p("A3GG6IAAyYIa6AAIAASYg");
	var mask_graphics_65 = new cjs.Graphics().p("A3LHDIAAygIbNAAIAASgg");
	var mask_graphics_66 = new cjs.Graphics().p("A3PHLIAAynIbfAAIAASng");
	var mask_graphics_67 = new cjs.Graphics().p("A3UHTIAAyuIbzAAIAASug");
	var mask_graphics_68 = new cjs.Graphics().p("A3ZHcIAAy3IcGAAIAAS3g");
	var mask_graphics_69 = new cjs.Graphics().p("A3dHkIAAy+IcYAAIAAS+g");
	var mask_graphics_70 = new cjs.Graphics().p("A3iHsIAAzFIcrAAIAATFg");
	var mask_graphics_71 = new cjs.Graphics().p("A3mH0IAAzMIc9AAIAATMg");
	var mask_graphics_72 = new cjs.Graphics().p("A3rH9IAAzUIdQAAIAATUg");
	var mask_graphics_73 = new cjs.Graphics().p("A3wIFIAAzbIdkAAIAATbg");
	var mask_graphics_74 = new cjs.Graphics().p("A30INIAAziId2AAIAATig");
	var mask_graphics_75 = new cjs.Graphics().p("A35IVIAAzqIeJAAIAATqg");
	var mask_graphics_76 = new cjs.Graphics().p("A39IeIAAzyIebAAIAATyg");
	var mask_graphics_77 = new cjs.Graphics().p("A4CImIAAz5IeuAAIAAT5g");
	var mask_graphics_78 = new cjs.Graphics().p("A4HIuIAA0AIfBAAIAAUAg");
	var mask_graphics_79 = new cjs.Graphics().p("A4LI3IAA0IIfUAAIAAUIg");
	var mask_graphics_80 = new cjs.Graphics().p("A4QI/IAA0PIfnAAIAAUPg");
	var mask_graphics_81 = new cjs.Graphics().p("A4UJHIAA0XIf5AAIAAUXg");
	var mask_graphics_82 = new cjs.Graphics().p("A4ZJPIAA0eMAgMAAAIAAUeg");
	var mask_graphics_83 = new cjs.Graphics().p("A4eJYIAA0mMAgfAAAIAAUmg");
	var mask_graphics_84 = new cjs.Graphics().p("A4iJgIAA0tMAgyAAAIAAUtg");
	var mask_graphics_85 = new cjs.Graphics().p("A4nJoIAA00MAhFAAAIAAU0g");
	var mask_graphics_86 = new cjs.Graphics().p("A4rJxIAA08MAhXAAAIAAU8g");
	var mask_graphics_87 = new cjs.Graphics().p("A4wJ5IAA1EMAhqAAAIAAVEg");
	var mask_graphics_88 = new cjs.Graphics().p("A41KBIAA1LMAh9AAAIAAVLg");
	var mask_graphics_89 = new cjs.Graphics().p("A45KJIAA1SMAiPAAAIAAVSg");
	var mask_graphics_90 = new cjs.Graphics().p("A4+KSIAA1aMAijAAAIAAVag");
	var mask_graphics_91 = new cjs.Graphics().p("A5CKaIAA1hMAi1AAAIAAVhg");
	var mask_graphics_92 = new cjs.Graphics().p("A5HKiIAA1oMAjIAAAIAAVog");
	var mask_graphics_93 = new cjs.Graphics().p("A5MKrIAA1wMAjbAAAIAAVwg");
	var mask_graphics_94 = new cjs.Graphics().p("A5QKzIAA14MAjtAAAIAAV4g");
	var mask_graphics_95 = new cjs.Graphics().p("A5VK7IAA1/MAkAAAAIAAV/g");
	var mask_graphics_96 = new cjs.Graphics().p("A5ZLDIAA2GMAkTAAAIAAWGg");
	var mask_graphics_97 = new cjs.Graphics().p("A5eLHIAA2NMAkmAAAIAAWNg");
	var mask_graphics_98 = new cjs.Graphics().p("A5jLLIAA2VMAk5AAAIAAWVg");
	var mask_graphics_99 = new cjs.Graphics().p("A5nLPIAA2dMAlLAAAIAAWdg");
	var mask_graphics_100 = new cjs.Graphics().p("A5sLTIAA2lMAleAAAIAAWlg");
	var mask_graphics_101 = new cjs.Graphics().p("A5wLWIAA2rMAlwAAAIAAWrg");
	var mask_graphics_102 = new cjs.Graphics().p("A51LaIAA2zMAmEAAAIAAWzg");
	var mask_graphics_103 = new cjs.Graphics().p("A56LeIAA27MAmXAAAIAAW7g");
	var mask_graphics_104 = new cjs.Graphics().p("A5+LhIAA3BMAmpAAAIAAXBg");
	var mask_graphics_105 = new cjs.Graphics().p("A6DLlIAA3JMAm8AAAIAAXJg");
	var mask_graphics_106 = new cjs.Graphics().p("A6HLpIAA3RMAnOAAAIAAXRg");
	var mask_graphics_107 = new cjs.Graphics().p("A6MLtIAA3ZMAnhAAAIAAXZg");
	var mask_graphics_108 = new cjs.Graphics().p("A6RLwIAA3fMAn1AAAIAAXfg");
	var mask_graphics_109 = new cjs.Graphics().p("A6VL0IAA3nMAoHAAAIAAXng");
	var mask_graphics_110 = new cjs.Graphics().p("A6aL4IAA3vMAoaAAAIAAXvg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:-118.4,y:-78.9}).wait(30).to({graphics:mask_graphics_1,x:-118.9,y:-78.8}).wait(1).to({graphics:mask_graphics_2,x:-119.3,y:-78.7}).wait(1).to({graphics:mask_graphics_3,x:-119.8,y:-78.6}).wait(1).to({graphics:mask_graphics_4,x:-120.2,y:-78.5}).wait(1).to({graphics:mask_graphics_5,x:-120.7,y:-78.4}).wait(1).to({graphics:mask_graphics_6,x:-121.2,y:-78.3}).wait(1).to({graphics:mask_graphics_7,x:-121.6,y:-78.3}).wait(1).to({graphics:mask_graphics_8,x:-122.1,y:-78.2}).wait(1).to({graphics:mask_graphics_9,x:-122.5,y:-78.1}).wait(1).to({graphics:mask_graphics_10,x:-123,y:-78}).wait(1).to({graphics:mask_graphics_11,x:-123.5,y:-77.9}).wait(1).to({graphics:mask_graphics_12,x:-123.9,y:-77.8}).wait(1).to({graphics:mask_graphics_13,x:-124.4,y:-77.8}).wait(1).to({graphics:mask_graphics_14,x:-124.8,y:-77.7}).wait(1).to({graphics:mask_graphics_15,x:-125.3,y:-77.6}).wait(1).to({graphics:mask_graphics_16,x:-125.8,y:-77.5}).wait(1).to({graphics:mask_graphics_17,x:-126.2,y:-77.4}).wait(1).to({graphics:mask_graphics_18,x:-126.7,y:-77.3}).wait(1).to({graphics:mask_graphics_19,x:-127.1,y:-77.2}).wait(1).to({graphics:mask_graphics_20,x:-127.6,y:-77.2}).wait(1).to({graphics:mask_graphics_21,x:-128.1,y:-77.1}).wait(1).to({graphics:mask_graphics_22,x:-128.5,y:-77}).wait(1).to({graphics:mask_graphics_23,x:-129,y:-76.9}).wait(1).to({graphics:mask_graphics_24,x:-129.4,y:-76.8}).wait(1).to({graphics:mask_graphics_25,x:-129.9,y:-76.7}).wait(1).to({graphics:mask_graphics_26,x:-130.4,y:-76.7}).wait(1).to({graphics:mask_graphics_27,x:-130.8,y:-76.6}).wait(1).to({graphics:mask_graphics_28,x:-131.3,y:-76.5}).wait(1).to({graphics:mask_graphics_29,x:-131.7,y:-76.4}).wait(1).to({graphics:mask_graphics_30,x:-132.2,y:-76.3}).wait(1).to({graphics:mask_graphics_31,x:-132.7,y:-76.2}).wait(1).to({graphics:mask_graphics_32,x:-133.1,y:-76.1}).wait(1).to({graphics:mask_graphics_33,x:-133.6,y:-76.1}).wait(1).to({graphics:mask_graphics_34,x:-134.1,y:-76}).wait(1).to({graphics:mask_graphics_35,x:-134.5,y:-75.9}).wait(1).to({graphics:mask_graphics_36,x:-135,y:-75.8}).wait(1).to({graphics:mask_graphics_37,x:-135.4,y:-75.7}).wait(1).to({graphics:mask_graphics_38,x:-135.9,y:-75.6}).wait(1).to({graphics:mask_graphics_39,x:-136.4,y:-75.6}).wait(1).to({graphics:mask_graphics_40,x:-136.8,y:-75.5}).wait(1).to({graphics:mask_graphics_41,x:-137.3,y:-75.4}).wait(1).to({graphics:mask_graphics_42,x:-137.7,y:-75.3}).wait(1).to({graphics:mask_graphics_43,x:-138.2,y:-75.2}).wait(1).to({graphics:mask_graphics_44,x:-138.7,y:-75.1}).wait(1).to({graphics:mask_graphics_45,x:-139.1,y:-75}).wait(1).to({graphics:mask_graphics_46,x:-139.6,y:-75}).wait(1).to({graphics:mask_graphics_47,x:-140,y:-74.9}).wait(1).to({graphics:mask_graphics_48,x:-140.5,y:-74.8}).wait(1).to({graphics:mask_graphics_49,x:-141,y:-74.7}).wait(1).to({graphics:mask_graphics_50,x:-141.4,y:-74.6}).wait(1).to({graphics:mask_graphics_51,x:-141.9,y:-74.5}).wait(1).to({graphics:mask_graphics_52,x:-142.3,y:-74.5}).wait(1).to({graphics:mask_graphics_53,x:-142.8,y:-74.4}).wait(1).to({graphics:mask_graphics_54,x:-143.3,y:-74.3}).wait(1).to({graphics:mask_graphics_55,x:-143.7,y:-74.2}).wait(1).to({graphics:mask_graphics_56,x:-144.2,y:-74.1}).wait(1).to({graphics:mask_graphics_57,x:-144.6,y:-74}).wait(1).to({graphics:mask_graphics_58,x:-145.1,y:-74}).wait(1).to({graphics:mask_graphics_59,x:-145.6,y:-73.9}).wait(1).to({graphics:mask_graphics_60,x:-146,y:-73.8}).wait(1).to({graphics:mask_graphics_61,x:-146.5,y:-73.7}).wait(1).to({graphics:mask_graphics_62,x:-146.9,y:-73.6}).wait(1).to({graphics:mask_graphics_63,x:-147.4,y:-73.5}).wait(1).to({graphics:mask_graphics_64,x:-147.9,y:-73.4}).wait(1).to({graphics:mask_graphics_65,x:-148.3,y:-73.4}).wait(1).to({graphics:mask_graphics_66,x:-148.8,y:-73.3}).wait(1).to({graphics:mask_graphics_67,x:-149.2,y:-73.2}).wait(1).to({graphics:mask_graphics_68,x:-149.7,y:-73.1}).wait(1).to({graphics:mask_graphics_69,x:-150.2,y:-73}).wait(1).to({graphics:mask_graphics_70,x:-150.6,y:-72.9}).wait(1).to({graphics:mask_graphics_71,x:-151.1,y:-72.9}).wait(1).to({graphics:mask_graphics_72,x:-151.5,y:-72.8}).wait(1).to({graphics:mask_graphics_73,x:-152,y:-72.7}).wait(1).to({graphics:mask_graphics_74,x:-152.5,y:-72.6}).wait(1).to({graphics:mask_graphics_75,x:-152.9,y:-72.5}).wait(1).to({graphics:mask_graphics_76,x:-153.4,y:-72.4}).wait(1).to({graphics:mask_graphics_77,x:-153.8,y:-72.3}).wait(1).to({graphics:mask_graphics_78,x:-154.3,y:-72.3}).wait(1).to({graphics:mask_graphics_79,x:-154.8,y:-72.2}).wait(1).to({graphics:mask_graphics_80,x:-155.2,y:-72.1}).wait(1).to({graphics:mask_graphics_81,x:-155.7,y:-72}).wait(1).to({graphics:mask_graphics_82,x:-156.1,y:-71.9}).wait(1).to({graphics:mask_graphics_83,x:-156.6,y:-71.8}).wait(1).to({graphics:mask_graphics_84,x:-157.1,y:-71.8}).wait(1).to({graphics:mask_graphics_85,x:-157.5,y:-71.7}).wait(1).to({graphics:mask_graphics_86,x:-158,y:-71.6}).wait(1).to({graphics:mask_graphics_87,x:-158.4,y:-71.5}).wait(1).to({graphics:mask_graphics_88,x:-158.9,y:-71.4}).wait(1).to({graphics:mask_graphics_89,x:-159.4,y:-71.3}).wait(1).to({graphics:mask_graphics_90,x:-159.8,y:-71.2}).wait(1).to({graphics:mask_graphics_91,x:-160.3,y:-71.2}).wait(1).to({graphics:mask_graphics_92,x:-160.7,y:-71.1}).wait(1).to({graphics:mask_graphics_93,x:-161.2,y:-71}).wait(1).to({graphics:mask_graphics_94,x:-161.7,y:-70.9}).wait(1).to({graphics:mask_graphics_95,x:-162.1,y:-70.8}).wait(1).to({graphics:mask_graphics_96,x:-162.6,y:-70.7}).wait(1).to({graphics:mask_graphics_97,x:-163,y:-70.2}).wait(1).to({graphics:mask_graphics_98,x:-163.5,y:-69.7}).wait(1).to({graphics:mask_graphics_99,x:-164,y:-69.1}).wait(1).to({graphics:mask_graphics_100,x:-164.4,y:-68.6}).wait(1).to({graphics:mask_graphics_101,x:-164.9,y:-68.1}).wait(1).to({graphics:mask_graphics_102,x:-165.4,y:-67.5}).wait(1).to({graphics:mask_graphics_103,x:-165.8,y:-67}).wait(1).to({graphics:mask_graphics_104,x:-166.3,y:-66.4}).wait(1).to({graphics:mask_graphics_105,x:-166.7,y:-65.9}).wait(1).to({graphics:mask_graphics_106,x:-167.2,y:-65.4}).wait(1).to({graphics:mask_graphics_107,x:-167.7,y:-64.8}).wait(1).to({graphics:mask_graphics_108,x:-168.1,y:-64.3}).wait(1).to({graphics:mask_graphics_109,x:-168.6,y:-63.7}).wait(1).to({graphics:mask_graphics_110,x:-169,y:-63.2}).wait(1));

	// Capa 1
	this.instance = new lib.CdP_Planteta();
	this.instance.setTransform(-509.1,-159.6,1,1,0,0,0,327.5,188);

	this.instance.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(30).to({scaleX:0.99,scaleY:0.99,x:-506.3,y:-158.6},0).wait(1).to({scaleX:0.99,scaleY:0.99,x:-503.6,y:-157.7},0).wait(1).to({scaleX:0.98,scaleY:0.98,x:-500.9,y:-156.8},0).wait(1).to({scaleX:0.98,scaleY:0.98,x:-498.2,y:-155.9},0).wait(1).to({scaleX:0.97,scaleY:0.97,x:-495.5,y:-155},0).wait(1).to({scaleX:0.97,scaleY:0.97,x:-492.8,y:-154.1},0).wait(1).to({scaleX:0.96,scaleY:0.96,x:-490.1,y:-153.2},0).wait(1).to({scaleX:0.96,scaleY:0.96,x:-487.4,y:-152.3},0).wait(1).to({scaleX:0.95,scaleY:0.95,x:-484.7,y:-151.5},0).wait(1).to({scaleX:0.94,scaleY:0.94,x:-482,y:-150.6},0).wait(1).to({scaleX:0.94,scaleY:0.94,x:-479.3,y:-149.7},0).wait(1).to({scaleX:0.93,scaleY:0.93,x:-476.6,y:-148.8},0).wait(1).to({scaleX:0.93,scaleY:0.93,x:-473.9,y:-147.9},0).wait(1).to({scaleX:0.92,scaleY:0.92,x:-471.2,y:-147},0).wait(1).to({scaleX:0.92,scaleY:0.92,x:-468.5,y:-146.1},0).wait(1).to({scaleX:0.91,scaleY:0.91,x:-465.8,y:-145.2},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:-463.1,y:-144.3},0).wait(1).to({scaleX:0.9,scaleY:0.9,x:-460.4,y:-143.4},0).wait(1).to({scaleX:0.89,scaleY:0.89,x:-457.7,y:-142.5},0).wait(1).to({scaleX:0.89,scaleY:0.89,x:-455,y:-141.6},0).wait(1).to({scaleX:0.88,scaleY:0.88,x:-452.3,y:-140.8},0).wait(1).to({scaleX:0.88,scaleY:0.88,x:-449.6,y:-139.9},0).wait(1).to({scaleX:0.87,scaleY:0.87,x:-446.9,y:-139},0).wait(1).to({scaleX:0.87,scaleY:0.87,x:-444.2,y:-138.1},0).wait(1).to({scaleX:0.86,scaleY:0.86,x:-441.5,y:-137.2},0).wait(1).to({scaleX:0.85,scaleY:0.85,x:-438.8,y:-136.3},0).wait(1).to({scaleX:0.85,scaleY:0.85,x:-436.1,y:-135.4},0).wait(1).to({scaleX:0.84,scaleY:0.84,x:-433.4,y:-134.5},0).wait(1).to({scaleX:0.84,scaleY:0.84,x:-430.7,y:-133.6},0).wait(1).to({scaleX:0.83,scaleY:0.83,x:-428,y:-132.7},0).wait(1).to({scaleX:0.83,scaleY:0.83,x:-425.3,y:-131.8},0).wait(1).to({scaleX:0.82,scaleY:0.82,x:-422.6,y:-131},0).wait(1).to({scaleX:0.81,scaleY:0.81,x:-419.9,y:-130.1},0).wait(1).to({scaleX:0.81,scaleY:0.81,x:-417.2,y:-129.2},0).wait(1).to({scaleX:0.8,scaleY:0.8,x:-414.5,y:-128.3},0).wait(1).to({scaleX:0.8,scaleY:0.8,x:-411.8,y:-127.4},0).wait(1).to({scaleX:0.79,scaleY:0.79,x:-409.2,y:-126.5},0).wait(1).to({scaleX:0.79,scaleY:0.79,x:-406.5,y:-125.6},0).wait(1).to({scaleX:0.78,scaleY:0.78,x:-403.7,y:-124.7},0).wait(1).to({scaleX:0.78,scaleY:0.78,x:-401,y:-123.8},0).wait(1).to({scaleX:0.77,scaleY:0.77,x:-398.3,y:-122.9},0).wait(1).to({scaleX:0.76,scaleY:0.76,x:-395.6,y:-122},0).wait(1).to({scaleX:0.76,scaleY:0.76,x:-392.9,y:-121.1},0).wait(1).to({scaleX:0.75,scaleY:0.75,x:-390.3,y:-120.3},0).wait(1).to({scaleX:0.75,scaleY:0.75,x:-387.6,y:-119.4},0).wait(1).to({scaleX:0.74,scaleY:0.74,x:-384.9,y:-118.5},0).wait(1).to({scaleX:0.74,scaleY:0.74,x:-382.1,y:-117.6},0).wait(1).to({scaleX:0.73,scaleY:0.73,x:-379.4,y:-116.7},0).wait(1).to({scaleX:0.72,scaleY:0.72,x:-376.7,y:-115.8},0).wait(1).to({scaleX:0.72,scaleY:0.72,x:-374,y:-114.9},0).wait(1).to({scaleX:0.71,scaleY:0.71,x:-371.3,y:-114},0).wait(1).to({scaleX:0.71,scaleY:0.71,x:-368.7,y:-113.1},0).wait(1).to({scaleX:0.7,scaleY:0.7,x:-366,y:-112.2},0).wait(1).to({scaleX:0.7,scaleY:0.7,x:-363.3,y:-111.3},0).wait(1).to({scaleX:0.69,scaleY:0.69,x:-360.6,y:-110.5},0).wait(1).to({scaleX:0.69,scaleY:0.69,x:-357.8,y:-109.6},0).wait(1).to({scaleX:0.68,scaleY:0.68,x:-355.1,y:-108.7},0).wait(1).to({scaleX:0.67,scaleY:0.67,x:-352.4,y:-107.8},0).wait(1).to({scaleX:0.67,scaleY:0.67,x:-349.8,y:-106.9},0).wait(1).to({scaleX:0.66,scaleY:0.66,x:-347.1,y:-106},0).wait(1).to({scaleX:0.66,scaleY:0.66,x:-344.4,y:-105.1},0).wait(1).to({scaleX:0.65,scaleY:0.65,x:-341.7,y:-104.2},0).wait(1).to({scaleX:0.65,scaleY:0.65,x:-339,y:-103.3},0).wait(1).to({scaleX:0.64,scaleY:0.64,x:-336.3,y:-102.4},0).wait(1).to({scaleX:0.63,scaleY:0.63,x:-333.5,y:-101.5},0).wait(1).to({scaleX:0.63,scaleY:0.63,x:-330.9,y:-100.6},0).wait(1).to({scaleX:0.62,scaleY:0.62,x:-328.2,y:-99.8},0).wait(1).to({scaleX:0.62,scaleY:0.62,x:-325.5,y:-98.9},0).wait(1).to({scaleX:0.61,scaleY:0.61,x:-322.8,y:-98},0).wait(1).to({scaleX:0.61,scaleY:0.61,x:-320.1,y:-97.1},0).wait(1).to({scaleX:0.6,scaleY:0.6,x:-317.4,y:-96.2},0).wait(1).to({scaleX:0.6,scaleY:0.6,x:-314.7,y:-95.3},0).wait(1).to({scaleX:0.59,scaleY:0.59,x:-311.9,y:-94.4},0).wait(1).to({scaleX:0.58,scaleY:0.58,x:-309.3,y:-93.5},0).wait(1).to({scaleX:0.58,scaleY:0.58,x:-306.6,y:-92.6},0).wait(1).to({scaleX:0.57,scaleY:0.57,x:-303.9,y:-91.7},0).wait(1).to({scaleX:0.57,scaleY:0.57,x:-301.2,y:-90.8},0).wait(1).to({scaleX:0.56,scaleY:0.56,x:-298.5,y:-89.9},0).wait(1).to({scaleX:0.56,scaleY:0.56,x:-295.8,y:-89.1},0).wait(1).to({scaleX:0.55,scaleY:0.55,x:-293.1,y:-88.2},0).wait(1).to({scaleX:0.54,scaleY:0.54,x:-290.4,y:-87.3},0).wait(1).to({scaleX:0.54,scaleY:0.54,x:-287.7,y:-86.4},0).wait(1).to({scaleX:0.53,scaleY:0.53,x:-285,y:-85.5},0).wait(1).to({scaleX:0.53,scaleY:0.53,x:-282.3,y:-84.6},0).wait(1).to({scaleX:0.52,scaleY:0.52,x:-279.6,y:-83.7},0).wait(1).to({scaleX:0.52,scaleY:0.52,x:-276.9,y:-82.8},0).wait(1).to({scaleX:0.51,scaleY:0.51,x:-274.2,y:-81.9},0).wait(1).to({scaleX:0.5,scaleY:0.5,x:-271.5,y:-81},0).wait(1).to({scaleX:0.5,scaleY:0.5,x:-268.8,y:-80.1},0).wait(1).to({scaleX:0.49,scaleY:0.49,x:-266.1,y:-79.2},0).wait(1).to({scaleX:0.49,scaleY:0.49,x:-263.4,y:-78.4},0).wait(1).to({scaleX:0.48,scaleY:0.48,x:-260.7,y:-77.5},0).wait(1).to({scaleX:0.48,scaleY:0.48,x:-258,y:-76.6},0).wait(1).to({scaleX:0.47,scaleY:0.47,x:-255.3,y:-75.7},0).wait(1).to({scaleX:0.47,scaleY:0.47,x:-252.6,y:-74.8},0).wait(1).to({scaleX:0.46,scaleY:0.46,x:-249.9,y:-73.9},0).wait(1).to({scaleX:0.45,scaleY:0.45,x:-247.2,y:-73},0).wait(1).to({scaleX:0.45,scaleY:0.45,x:-244.5,y:-72.1},0).wait(1).to({scaleX:0.44,scaleY:0.44,x:-241.8,y:-71.2},0).wait(1).to({scaleX:0.44,scaleY:0.44,x:-239.1,y:-70.3},0).wait(1).to({scaleX:0.43,scaleY:0.43,x:-236.4,y:-69.4},0).wait(1).to({scaleX:0.43,scaleY:0.43,x:-233.7,y:-68.6},0).wait(1).to({scaleX:0.42,scaleY:0.42,x:-231,y:-67.7},0).wait(1).to({scaleX:0.41,scaleY:0.41,x:-228.3,y:-66.8},0).wait(1).to({scaleX:0.41,scaleY:0.41,x:-225.6,y:-65.9},0).wait(1).to({scaleX:0.4,scaleY:0.4,x:-222.9,y:-65},0).wait(1).to({scaleX:0.4,scaleY:0.4,x:-220.2,y:-64.1},0).wait(1).to({scaleX:0.39,scaleY:0.39,x:-217.5,y:-63.2},0).wait(1).to({scaleX:0.39,scaleY:0.39,x:-214.8,y:-62.3},0).wait(1).to({scaleX:0.38,scaleY:0.38,x:-212.1,y:-61.4},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-836.7,-347.6,655,376);

   
   

    (lib.btn_ampliar = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Capa 1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#FEFEFE").s().p("AgPBcIAAhNIhMAAIAAgeIBMAAIAAhMIAfAAIAABMIBMAAIAAAeIhMAAIAABNg");
        this.shape.setTransform(0, 5.4);

        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f().s("#1E120D").ss(1, 0, 1).p("ADNDNQgRASgZAAIlFAAQgYAAgSgSQgSgRAAgZIAAlFQAAgYASgSQASgSAYAAIFFAAQAZAAARASQASASAAAYIAAFFQAAAZgSARg");
        this.shape_1.setTransform(-0.4, 5.1, 0.673, 0.673);

        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#1E120D").s().p("AiiDeQgYAAgSgRQgRgSAAgZIAAlEQAAgYARgSQASgRAYAAIFEAAQAZAAASARQARASAAAYIAAFEQAAAZgRASQgSARgZAAg");
        this.shape_2.setTransform(-0.4, 5.1, 0.673, 0.673);

        this.shape_3 = new cjs.Shape();
        this.shape_3.graphics.f().s("#1E120D").ss(1, 0, 1).p("ADfCjQAAAZgSARQgRASgZAAIlFAAQgYAAgSgSQgSgRAAgZIAAlFQAAgYASgSQASgSAYAAIFFAAQAZAAARASQASASAAAYg");
        this.shape_3.setTransform(-0.4, 5.3, 0.74, 0.74);

        this.timeline.addTween(cjs.Tween.get({}).to({state: [{t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673, y: 5.1}}, {t: this.shape_1}, {t: this.shape, p: {x: 0, y: 5.4}}]}).to({state: [{t: this.shape_2, p: {scaleX: 0.74, scaleY: 0.74, y: 5.3}}, {t: this.shape_3, p: {scaleX: 0.74, scaleY: 0.74, y: 5.3}}, {t: this.shape, p: {x: -0.3, y: 5.4}}]}, 1).to({state: [{t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673, y: 5.1}}, {t: this.shape_3, p: {scaleX: 0.673, scaleY: 0.673, y: 5.1}}, {t: this.shape, p: {x: 0.1, y: 5.6}}]}, 1).to({state: [{t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673, y: 5.1}}, {t: this.shape_3, p: {scaleX: 0.673, scaleY: 0.673, y: 5.1}}, {t: this.shape, p: {x: 0.1, y: 5.6}}]}, 1).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-15.4, -9.8, 30, 30);

    (lib.btn_cerrar = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Capa 1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#FEFEFE").s().p("AAcBCIgcgoIgcAoIgwAAIA0hCIg0hBIAyAAIAaAnIAcgnIAxAAIg0BBIA0BCg");
        this.shape.setTransform(-0.4, 4.5);

        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f().s("#1E120D").ss(1, 0, 1).p("ADfCjQAAAZgSARQgRASgZAAIlFAAQgYAAgSgSQgSgRAAgZIAAlFQAAgYASgSQASgSAYAAIFFAAQAZAAARASQASASAAAYg");
        this.shape_1.setTransform(-0.4, 5.1, 0.673, 0.673);

        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#1E120D").s().p("AiiDeQgYAAgSgRQgRgSAAgZIAAlEQAAgYARgSQASgRAYAAIFEAAQAZAAASARQARASAAAYIAAFEQAAAZgRASQgSARgZAAg");
        this.shape_2.setTransform(-0.4, 5.1, 0.673, 0.673);

        this.timeline.addTween(cjs.Tween.get({}).to({state: [{t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673, y: 5.1}}, {t: this.shape_1, p: {scaleX: 0.673, scaleY: 0.673, y: 5.1}}, {t: this.shape, p: {scaleX: 1, scaleY: 1, x: -0.4, y: 4.5}}]}).to({state: [{t: this.shape_2, p: {scaleX: 0.74, scaleY: 0.74, y: 5.3}}, {t: this.shape_1, p: {scaleX: 0.74, scaleY: 0.74, y: 5.3}}, {t: this.shape, p: {scaleX: 1.177, scaleY: 1.177, x: 0.1, y: 5.2}}]}, 1).to({state: [{t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673, y: 5.1}}, {t: this.shape_1, p: {scaleX: 0.673, scaleY: 0.673, y: 5.1}}, {t: this.shape, p: {scaleX: 1, scaleY: 1, x: -0.9, y: 4.5}}]}, 1).to({state: [{t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673, y: 5.1}}, {t: this.shape_1, p: {scaleX: 0.673, scaleY: 0.673, y: 5.1}}, {t: this.shape, p: {scaleX: 1, scaleY: 1, x: -0.4, y: 4.8}}]}, 1).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-19.5, -16.7, 38.7, 40.9);


    (lib.gris = function () {
        this.initialize();

        // Capa 1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#666666").s().p("AipD2QhNg0gghTQgVg2AAg5QABgVACgWQARhuBThIQBUhKBwAAQBvAABUBKQBUBIASBuQADAYAAATQAAA4gXA3QggBThMA0QhMA2hdAAQhdAAhMg2gAhPDYQgRANgIAMQAyAWA2AAQA2AAAzgWQgHgNgTgMQgigZgtAAQgsAAgjAZgAgxBvQg8AFg4AXQgcALgPAKQAeAoApAZQANgRAYgTQAughA2AAQA7AAAuAhQAWARALARQApgaAcglQgPgKgagKQg2gYg9gFQgVgFgeAAQgcAAgVAFgAjuBvQAGAMAEAHQANgKAZgJQBXgpBngBQBnABBZApQAYAIAOAJIAIgRQAUguAFgwIoNAAQADAuAVAwgAEFgTQAAgPgDgJQgHgtgXgoQgYAPgnAOQhRAdhUAAQhTAAhSgcQgqgOgWgPQgXAogHAsIgDAYIILAAIAAAAgAjRidQATANAjANQBJAbBSAAQBSAABHgdQAjgNATgPQgZghgvgeQgKASgWAQQgsAig7AAQg7AAgtgiQgQgKgLgOIgIgKQgsAegaAlgAhqjvIAGAHQAHAJALAGQAjAZAvAAQAwgBAhgZQAPgLAHgOQgygSg1gBQg4AAgyAXg");
        this.shape.setTransform(30, 30);

        this.addChild(this.shape);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 60, 60);



    (lib.btn_inicio = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // FlashAICB
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#FFFFFF").s().p("Ah9CQIAAioIg3ABIC0h4IC1B4Ig1gBIAACnIhPAAIAAiZIhgAAIAACag");
        this.shape.setTransform(0, 0, 0.673, 0.673);

        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f().s("#1E120D").ss(1, 0, 1).p("ADfCjQAAAZgSARQgRASgZAAIlFAAQgYAAgSgSQgSgRAAgZIAAlFQAAgYASgSQASgSAYAAIFFAAQAZAAARASQASASAAAYg");
        this.shape_1.setTransform(0, 0, 0.673, 0.673);

        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#1E120D").s().p("AiiDeQgYAAgSgRQgRgSAAgZIAAlEQAAgYARgSQASgRAYAAIFEAAQAZAAASARQARASAAAYIAAFEQAAAZgRASQgSARgZAAg");
        this.shape_2.setTransform(0, 0, 0.673, 0.673);

        this.timeline.addTween(cjs.Tween.get({}).to({state: [{t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape_1, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape, p: {scaleX: 0.673, scaleY: 0.673}}]}).to({state: [{t: this.shape_2, p: {scaleX: 0.74, scaleY: 0.74}}, {t: this.shape_1, p: {scaleX: 0.74, scaleY: 0.74}}, {t: this.shape, p: {scaleX: 0.74, scaleY: 0.74}}]}, 1).to({state: [{t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape_1, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape, p: {scaleX: 0.673, scaleY: 0.673}}]}, 1).to({state: [{t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape_1, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape, p: {scaleX: 0.673, scaleY: 0.673}}]}, 1).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-14.9, -14.9, 30, 30);


    (lib.btn_anterior = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Capa 1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#FFFFFF").s().p("AhviXIDfCXIjfCYg");
        this.shape.setTransform(-3.5, 0, 0.673, 0.673, 180);

        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#FFFFFF").s().p("AgvBWIAAirIBgAAIAACrg");
        this.shape_1.setTransform(6.5, 0.1, 0.673, 0.673, 180);

        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f().s("#1E120D").ss(1, 0, 1).p("ADeCiQAAAZgRASQgSARgZAAIlDAAQgZAAgSgRQgRgSAAgZIAAlDQAAgZARgSQASgRAZAAIFDAAQAZAAASARQARASAAAZg");
        this.shape_2.setTransform(0, 0, 0.673, 0.673, 180);

        this.shape_3 = new cjs.Shape();
        this.shape_3.graphics.f("#1E120D").s().p("AihDeQgZAAgSgRQgRgSAAgZIAAlDQAAgZARgSQASgRAZAAIFDAAQAZAAASARQARASAAAZIAAFDQAAAZgRASQgSARgZAAg");
        this.shape_3.setTransform(0, 0, 0.673, 0.673, 180);

        this.timeline.addTween(cjs.Tween.get({}).to({state: [{t: this.shape_3, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape_1, p: {scaleX: 0.673, scaleY: 0.673, x: 6.5}}, {t: this.shape, p: {scaleX: 0.673, scaleY: 0.673, x: -3.5}}]}).to({state: [{t: this.shape_3, p: {scaleX: 0.741, scaleY: 0.741}}, {t: this.shape_2, p: {scaleX: 0.741, scaleY: 0.741}}, {t: this.shape_1, p: {scaleX: 0.741, scaleY: 0.741, x: 7.2}}, {t: this.shape, p: {scaleX: 0.741, scaleY: 0.741, x: -3.8}}]}, 1).to({state: [{t: this.shape_3, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape_1, p: {scaleX: 0.673, scaleY: 0.673, x: 6.5}}, {t: this.shape, p: {scaleX: 0.673, scaleY: 0.673, x: -3.5}}]}, 1).to({state: [{t: this.shape_3, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape_1, p: {scaleX: 0.673, scaleY: 0.673, x: 6.5}}, {t: this.shape, p: {scaleX: 0.673, scaleY: 0.673, x: -3.5}}]}, 1).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-14.9, -14.9, 30, 30);


    (lib.btn_siguiente = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Capa 1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#FFFFFF").s().p("AhviXIDfCXIjfCYg");
        this.shape.setTransform(3.6, 0, 0.673, 0.673);

        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#FFFFFF").s().p("AgvBWIAAirIBgAAIAACrg");
        this.shape_1.setTransform(-6.4, 0, 0.673, 0.673);

        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f().s("#1E120D").ss(1, 0, 1).p("ADeCiQAAAZgRASQgSARgZAAIlDAAQgZAAgSgRQgRgSAAgZIAAlDQAAgZARgSQASgRAZAAIFDAAQAZAAASARQARASAAAZg");
        this.shape_2.setTransform(0, 0, 0.673, 0.673);

        this.shape_3 = new cjs.Shape();
        this.shape_3.graphics.f("#1E120D").s().p("AihDeQgZAAgSgRQgRgSAAgZIAAlDQAAgZARgSQASgRAZAAIFDAAQAZAAASARQARASAAAZIAAFDQAAAZgRASQgSARgZAAg");
        this.shape_3.setTransform(0, 0, 0.673, 0.673);

        this.timeline.addTween(cjs.Tween.get({}).to({state: [{t: this.shape_3, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape_1, p: {scaleX: 0.673, scaleY: 0.673, x: -6.4}}, {t: this.shape, p: {scaleX: 0.673, scaleY: 0.673, x: 3.6}}]}).to({state: [{t: this.shape_3, p: {scaleX: 0.741, scaleY: 0.741}}, {t: this.shape_2, p: {scaleX: 0.741, scaleY: 0.741}}, {t: this.shape_1, p: {scaleX: 0.741, scaleY: 0.741, x: -7.1}}, {t: this.shape, p: {scaleX: 0.741, scaleY: 0.741, x: 3.9}}]}, 1).to({state: [{t: this.shape_3, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape_1, p: {scaleX: 0.673, scaleY: 0.673, x: -6.4}}, {t: this.shape, p: {scaleX: 0.673, scaleY: 0.673, x: 3.6}}]}, 1).to({state: [{t: this.shape_3, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape_1, p: {scaleX: 0.673, scaleY: 0.673, x: -6.4}}, {t: this.shape, p: {scaleX: 0.673, scaleY: 0.673, x: 3.6}}]}, 1).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-14.9, -14.9, 30, 30);

    (lib.btn_info = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        this.shape = new cjs.Shape();
        this.shape.graphics.f("#FEFEFE").s().p("AgUBbIAAiCIApAAIAACCgAgVg6IAAggIArAAIAAAgg");
        this.shape.setTransform(15.3, 16);

        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f().s("#1E120D").ss(1, 0, 1).p("ADeCiQAAAZgRASQgSARgZAAIlDAAQgZAAgSgRQgRgSAAgZIAAlDQAAgZARgSQASgRAZAAIFDAAQAZAAASARQARASAAAZg");
        this.shape_1.setTransform(15, 15.9, 0.673, 0.673);

        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#1E120D").s().p("AihDeQgZAAgSgRQgRgSAAgZIAAlDQAAgZARgSQASgRAZAAIFDAAQAZAAASARQARASAAAZIAAFDQAAAZgRASQgSARgZAAg");
        this.shape_2.setTransform(15, 15.9, 0.673, 0.673);

        this.timeline.addTween(cjs.Tween.get({}).to({state: [{t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape_1, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape, p: {scaleX: 1, scaleY: 1, x: 15.3, y: 16}}]}).to({state: [{t: this.shape_2, p: {scaleX: 0.741, scaleY: 0.741}}, {t: this.shape_1, p: {scaleX: 0.741, scaleY: 0.741}}, {t: this.shape, p: {scaleX: 1.225, scaleY: 1.054, x: 15.4, y: 15.8}}]}, 1).to({state: [{t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape_1, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape, p: {scaleX: 1, scaleY: 1, x: 15.3, y: 16}}]}, 1).to({state: [{t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape_1, p: {scaleX: 0.673, scaleY: 0.673}}, {t: this.shape, p: {scaleX: 1, scaleY: 1, x: 15.3, y: 16}}]}, 1).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-15, -15, 30, 30);

    (lib.btn_cerrar = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Capa 1
        this.shape = new cjs.Shape();
        this.shape.graphics.f("#FEFEFE").s().p("AAcBCIgcgoIgcAoIgwAAIA0hCIg0hBIAyAAIAaAnIAcgnIAxAAIg0BBIA0BCg");
        this.shape.setTransform(-0.4, 4.5);

        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f().s("#1E120D").ss(1, 0, 1).p("ADfCjQAAAZgSARQgRASgZAAIlFAAQgYAAgSgSQgSgRAAgZIAAlFQAAgYASgSQASgSAYAAIFFAAQAZAAARASQASASAAAYg");
        this.shape_1.setTransform(-0.4, 5.1, 0.673, 0.673);

        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#1E120D").s().p("AiiDeQgYAAgSgRQgRgSAAgZIAAlEQAAgYARgSQASgRAYAAIFEAAQAZAAASARQARASAAAYIAAFEQAAAZgRASQgSARgZAAg");
        this.shape_2.setTransform(-0.4, 5.1, 0.673, 0.673);

        this.timeline.addTween(cjs.Tween.get({}).to({state: [{t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673, y: 5.1}}, {t: this.shape_1, p: {scaleX: 0.673, scaleY: 0.673, y: 5.1}}, {t: this.shape, p: {scaleX: 1, scaleY: 1, x: -0.4, y: 4.5}}]}).to({state: [{t: this.shape_2, p: {scaleX: 0.74, scaleY: 0.74, y: 5.3}}, {t: this.shape_1, p: {scaleX: 0.74, scaleY: 0.74, y: 5.3}}, {t: this.shape, p: {scaleX: 1.177, scaleY: 1.177, x: 0.1, y: 5.2}}]}, 1).to({state: [{t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673, y: 5.1}}, {t: this.shape_1, p: {scaleX: 0.673, scaleY: 0.673, y: 5.1}}, {t: this.shape, p: {scaleX: 1, scaleY: 1, x: -0.9, y: 4.5}}]}, 1).to({state: [{t: this.shape_2, p: {scaleX: 0.673, scaleY: 0.673, y: 5.1}}, {t: this.shape_1, p: {scaleX: 0.673, scaleY: 0.673, y: 5.1}}, {t: this.shape, p: {scaleX: 1, scaleY: 1, x: -0.4, y: 4.8}}]}, 1).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(-19.5, -16.7, 38.7, 40.9);

    (lib.btn_practica = function (texto, mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // Capa 1
        this.text = new cjs.Text(texto, "bold 16px Verdana");
        this.text.textAlign = "center";
        this.text.lineHeight = 18;
        this.text.lineWidth = 149;
        this.text.setTransform(74.5, 10);

        this.shape = new cjs.Shape();
        this.shape.graphics.f().s("#000000").ss(1, 1, 1).p("AK4imI1vAAQhGAAAABDIAADHQAABDBGAAIVvAAQBGAAAAhDIAAjHQAAhDhGAAg");
        this.shape.setTransform(76.7, 16.8);

        this.shape_1 = new cjs.Shape();
        this.shape_1.graphics.f("#FFFFFF").s().p("Aq3CnQhGAAAAhDIAAjHQAAhDBGAAIVvAAQBGAAAABDIAADHQAABDhGAAg");
        this.shape_1.setTransform(76.7, 16.8);

        this.shape_2 = new cjs.Shape();
        this.shape_2.graphics.f("#CCCCCC").s().p("Aq3CnQhGAAAAhDIAAjHQAAhDBGAAIVvAAQBGAAAABDIAADHQAABDhGAAg");
        this.shape_2.setTransform(76.7, 16.8);

        this.shape_3 = new cjs.Shape();
        this.shape_3.graphics.f("#666666").s().p("Aq3CnQhGAAAAhDIAAjHQAAhDBGAAIVvAAQBGAAAABDIAADHQAABDhGAAg");
        this.shape_3.setTransform(76.7, 16.8);

        this.shape_4 = new cjs.Shape();
        this.shape_4.graphics.f("#FFFFFF").s("#000000").ss(1, 1, 1).rr(-65, -15, 130, 30, 6);
        this.shape_4.setTransform(76.7, 16.8, 1.18, 1.118);

        this.timeline.addTween(cjs.Tween.get({}).to({state: [{t: this.shape_1}, {t: this.shape}, {t: this.text, p: {color: "#000000"}}]}).to({state: [{t: this.shape_2}, {t: this.shape}, {t: this.text, p: {color: "#000000"}}]}, 1).to({state: [{t: this.shape_3}, {t: this.text, p: {color: "#FFFFFF"}}]}, 1).to({state: [{t: this.shape_4}, {t: this.text, p: {color: "#000000"}}]}, 1).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 153.4, 33.6);

    (lib.fadeText = function (textohtml, espera, delay, mode, startPosition, loop) {
        espera = espera || 0;
        delay = delay || 20;
        this.initialize(mode, startPosition, loop, {});
        this.texto = new cjs.DOMElement(textohtml);
        this.texto.alpha = 0;
        this.timeline.addTween(cjs.Tween.get(this.texto).wait(espera).to({alpha: 1}, delay).wait(100000));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 950, 608);
    (lib.fadeElement = function (elemento, espera, delay, mode, startPosition, loop) {
        espera = espera || 0;
        delay = delay || 20;
        this.initialize(mode, startPosition, loop, {});
        elemento.alpha = 0;
        this.timeline.addTween(cjs.Tween.get(elemento).wait(espera).to({alpha: 1}, delay).wait(100000));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 950, 608);

})(lib = lib || {}, images = images || {}, createjs = createjs || {}, textos = textos || {});
var lib, images, createjs, textos;


function clearTexts() {
    var childNodes = document.body.childNodes;
    for (var i = childNodes.length - 1; i >= 0; i--) {
        if (childNodes[i].nodeType == 1 && childNodes[i].nodeName == 'DIV') {
            var child = childNodes[i];
            if (child != null)
                child.parentNode.removeChild(child);
        }
    }

}
function createDiv(texto, family, size, width, height, top, left, align, id) {

    var html = document.createElement('div');
    html.id = id;
    html.innerHTML = texto;

    html.style.textAlign = align;
    html.style.visibility = "hidden";
    html.style.fontFamily = family;
    html.style.fontSize = size;
    html.style.backgroundColor = "transparent";
    html.style.width = width;
    html.style.height = height;
    html.style.position = "absolute";

    document.body.appendChild(html);
    return html;
}

function chuleta() {
    //Esqueletos popup; BG_09_07_08
    //Cajas con animaciones: FQ_09_08_04 FQ_10_11_01
    //Textos pinchar y popups respuestas: LC_10_10_05
    //gif: MTB_10_02_06
    //Imagen+texto
    this.imagen = new lib.Bitmap45copy();
    var ancho = imagen(this, 1, 0.471, 0.471);
    texto(this, txt['pantalla2_2'], 0, ancho);

//Texto simple
    var html = createDiv(texto, "Verdana", "20px", '770px', '400px', "20px", "185px", "left");
    this.texto = new cjs.DOMElement(html);
    this.texto.setTransform(90, -482);
    //Botón ampliar
    this.ampliar = new lib.btn_ampliar();
    this.ampliar.setTransform(376.7, 178);
    new cjs.ButtonHelper(this.ampliar, 0, 1, 2, false, new lib.btn_ampliar(), 3);

    this.ampliar.on("click", function (evt) {
        putStage(new lib.frame1_1b());
    });

    //Fade text y element
    var html = createDiv(txt['txt_01_01'], "Verdana", "20px", '800px', '100px', "20px", "185px", "left");
    this.texto1 = new lib.fadeText(html, 0);
    this.texto1.setTransform(100, -520);
    var flecha = new lib.flecha();
    this.flechaA = new lib.fadeElement(flecha, 25);
    this.flechaA.setTransform(300.1, 193.2, 1, 1, 0, 0, 0, 5.7, 36.8);
    
    //Botón práctiva
    this.practica = new lib.btn_practica(txt['textbtnpractica']);
        this.practica.setTransform(837, 575, 1, 1, 0, 0, 0, 65, 15);
        new cjs.ButtonHelper(this.practica, 0, 1, 2, false, new lib.btn_practica(), 3);

}