$(document).ready(function() {
    var cutDescription = function(description) {
            return description.substr(0, 100) + '......';
        }
        /*为模板注册辅助函数*/
    juicer.register('cutDescription', cutDescription);
    var shopContainer = $('#shopContainer'),
        shopMenuWrapper = shopContainer.find('.reviews'),
        shopMenuTemplata = $('#shopMenuTemplata').html(),
        goodsClassTemplata = $('#goodsClassTemplata').html(),
        biuldShopMenu = juicer(shopMenuTemplata),
        biuldGoodsClass = juicer(goodsClassTemplata),
        $gclassWrapper = $('.goodsClass').find('.btn-toolbar'),
        $shopsMenuWrapper = $('#shopsMenuWrapper'),
        $findForm = $('#findForm'),
        $inputKey = $findForm.find('#inputKey');
    var layzr = {};
    (function init() {
        biuldGoodsClassMenu();
        /*商品分类表*/
        initBegin();
        initFind();
    }());

    function initLayzr(wrapper) {
        layzr = null;
        layzr = new Layzr({
            selector: '[data-layzr]',
            attr: 'data-layzr',
            threshold: 10,
            callback: function() {
                wrapper.masonry({
                    itemSelector: '.hreviewra',
                    isAnimated: true
                });
            }
        });
    }

    function initBegin() {
        var key = $inputKey.val() || false;
        var url = "/goods";
        if (key) {
            url = $findForm.attr('action') + "?key=" + key;
        }
        biuldGoodsMenu(url);
    }

    function initFind() {
        $findForm.on('submit', function(event) {
            event.preventDefault();
            var key = $inputKey.val() || false;
            if (key) {
                var url = $findForm.attr('action') + "?key=" + key;
                biuldGoodsMenu(url);
            } else {
                alert("请输入查找的关键字");
            }
        });
    }

    function biuldGoodsClassMenu() {
        $.getJSON('/gcmenu', function(data) {
            var biuldata = {
                "menus": data
            }
            var html = biuldGoodsClass.render(biuldata);
            $gclassWrapper.html(html);
            $gclassWrapper.on('click', '.btn-group>a', function(event) {
                event.preventDefault();
                biuldGoodsMenu($(this).attr('href'));
            });

        });
    }
    /*商品目录*/
    function biuldGoodsMenu(url) {
        $.getJSON(url, function(data) {
            console.log(data);
            var biuldata = {
                "menus": data
            }
            var html = biuldShopMenu.render(biuldata);
            biuldMasonry($shopsMenuWrapper, html);
        });
    }

    function biuldMasonry(wrapper, html) {
        console.log("建立瀑布流！！！");
        wrapper.empty().html(html);
        /*类似与瀑布流事件的重新绑定，因为*/
        wrapper.masonry('reloadItems');
        wrapper.masonry({
            itemSelector: '.hreviewra',
            isAnimated: true
        });
       /* initLayzr(wrapper);*/
        wrapper.find('img').on('load', function() {
            console.log('img load ok');
            wrapper.masonry({
                itemSelector: '.hreviewra',
                isAnimated: true
            });

        });
    }

});
