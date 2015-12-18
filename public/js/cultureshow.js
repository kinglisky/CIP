$(document).ready(function() {
   var cutDescription = function(description) {
        return description.substr(0, 100)+'......';
    }
        /*为模板注册辅助函数*/
    juicer.register('cutDescription', cutDescription);
    var $menu = $("#menu"),
        $submenu = $("#submenu"),
        $thrmenu = $('#thrmenu'),
        $contentwrapper = $menu.find('.contentwrapper'),
        $subcontentwrapper = $submenu.find('.contentwrapper'),
        $thrcontentwrapper = $thrmenu.find('.contentwrapper'),
        menutemplata = $('#menutemplata').html(),
        biuldMenu = juicer(menutemplata);
    init();

    function init() {
        $submenu.hide();
        $thrmenu.hide();
        var menudata = [],
            submenudata = [],
            thrmenudata = [];
        $.getJSON('/cmenu?use=show', function(data) {
            menudata = data;
            var biuldMenuData = {
                "menus": data,
                "murl": "/scmenu",
                "shop": false
            };
            var html = biuldMenu.render(biuldMenuData);
            biuldMasonry($contentwrapper, html);
            $contentwrapper.on('click', '.hreviewra a', function(event) {
                event.preventDefault();
                var url = $(this).attr('href'),
                    index = $(this).data('index'),
                    name = menudata[index].name,
                    description = menudata[index].description;
                $submenu.find('.head').text(name);
                $submenu.find('.menudescription>p').text(description);
                $submenu.find('.returnmenu').on('click', function(event) {
                    event.preventDefault();
                    $submenu.hide(1000);
                    $menu.show(1000);
                });
                biulSubEvent(url);
            });
        });

        function biulSubEvent(url) {
            console.log("get url" + url);
            $.getJSON(url, function(data) {
                submenudata = data;
                var biuldMenuData = {
                    "menus": data,
                    "murl": "/tcmenu",
                    "shop": false
                };
                $menu.hide(1000);
                $submenu.show(1000);
                var html = biuldMenu.render(biuldMenuData);
                biuldMasonry($subcontentwrapper, html);
                $subcontentwrapper.on('click', '.hreviewra a', function(event) {
                    event.preventDefault();
                    var url = $(this).attr('href'),
                        index = $(this).data('index'),
                        name = submenudata[index].name,
                        description = submenudata[index].description;
                    $thrmenu.find('.head').text(name);
                    $thrmenu.find('.menudescription>p').text(description);
                    $thrmenu.find('.returnmenu').on('click', function(event) {
                        event.preventDefault();
                        $thrmenu.hide(1000);
                        $submenu.show(1000);
                    });
                    biuldThrEvent(url);
                });
            });
        }

        function biuldThrEvent(url) {
            $.getJSON(url, function(data) {
                thrmenudata = data;
                var biuldMenuData = {
                    "menus": data,
                    "murl": "#",
                    "shop": true
                };
                $submenu.hide(1000);
                $thrmenu.show(1000);
                var html = biuldMenu.render(biuldMenuData);
                biuldMasonry($thrcontentwrapper, html);
            });
        }
        /*监听图片的加载用于出发瀑布流*/
        function biuldMasonry(wrapper, html) {
            wrapper.html(html).find('img').on('load', function() {
                console.log("img load ok");
                wrapper.masonry({
                    itemSelector: '.hreviewra',
                    isAnimated: true
                });
            });
        }
    }
});
