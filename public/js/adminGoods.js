$(document).ready(function() {
    var cutDescription=function(text){
        return text.substr(0,50)+'......';
    }
    /*为模板注册辅助函数*/
    juicer.register('cutDescription',cutDescription);
    var $goodsclassModule = $('#goodsclassModule'),
        $goodsModule = $('#goodsModule'),
        $returMbtn = $goodsModule.find('.returnmenu'),
        $load = $goodsModule.find('.load'),
        menuTemplata = $('#menuTemplata').html(),
        subMenuTemplata = $('#subMenuTemplata').html(),
        addSubMenuTemplata = $('#addSubMenuTemplata').html(),
        biuldMenuTemplata = juicer(menuTemplata),
        biuldSubMenuTemplata = juicer(subMenuTemplata),
        biuldAddSubMenuTemplata = juicer(addSubMenuTemplata),
        $menusWrapper = $('#menusWrapper'),
        $shopsMenuWrapper = $('#shopsMenuWrapper');
    $curGlassLink = {};
    (function init() {
        $goodsModule.hide();
        $load.hide();
        loadAdminMenu();
        initAddGoods();
        initDragToAdd();
        initReturnMenu();
    }());

    function initReturnMenu() {
        $returMbtn.on('click', function(event) {
            event.preventDefault();
            $goodsModule.hide(1000);
            $goodsclassModule.show(1000);

        });
    }

    function loadAdminMenu() {
        var templataData = {},
            url = "/gcmenu";
        $.getJSON(url, function(data) {
            console.log(data);
            templataData = {
                "posturl": url,
                "menus": data
            };
            $menusWrapper.html(biuldMenuTemplata.render(templataData));
            $menusWrapper.find('form').on('submit', function(event) {
                event.preventDefault();
                var url = $(this).attr('action'),
                    pdata = ecode($(this).serialize());
                $.post(url, pdata, function(data) {
                    if ("Ye" == data) {
                        loadAdminMenu();
                    } else {
                        alert(data);
                    }
                });
            });
            $menusWrapper.find('.features-item>a').on('click', function(event) {
                event.preventDefault();
                $curGlassLink = $(this);
                var gccode = $(this).data('code');
                loadSubMenu(gccode);
                $goodsModule.show(1000);
                $goodsclassModule.hide(1000);
            });
            $menusWrapper.find('.btn-group>a').on('click', function(event) {
                event.preventDefault();
                $.get($(this).attr('href'), function(data) {
                    if ("Ye" == data) {
                        loadAdminMenu();
                    } else {
                        alert(data);
                    }
                });
            });
        });
    }

    function biuldMasonry(wrapper, html) {
        wrapper.empty().html(html);
        /*类似与瀑布流事件的重新绑定，因为dom结构有更新*/
        wrapper.masonry('reloadItems');
        wrapper.find('img').on('load', function() {
            console.log('img load ok');
            wrapper.masonry({
                itemSelector: '.hreviewra',
                isAnimated: true
            });

        });
    }

    function loadSubMenu(gccode) {
        var url = "/goods?code=" + gccode;
        $.getJSON(url, function(data) {
            var html = biuldSubMenuTemplata.render({
                "menus": data
            });
            biuldMasonry($shopsMenuWrapper, html);
            $shopsMenuWrapper.find('.btn-group>a').on('click', function(event) {
                event.preventDefault();
                $.get($(this).attr('href'), function(data) {
                    if("Ye"==data){
                        $curGlassLink.trigger('click');
                    }
                    else{
                        alert(data);
                    }
                });
            });
            $shopsMenuWrapper.trigger('readyDrag', [gccode]);
        });

    }

    function initDragToAdd() {
        $shopsMenuWrapper.on('readyDrag', function(event, gccode) {
            $dragwrapper = $shopsMenuWrapper.find('#dragwrapper');
            $dragwrapper.on('dragenter', function(event) {
                event.preventDefault();
                event.stopPropagation();
                $dragwrapper.addClass('drag');
            });
            $dragwrapper.on('dragover', function(event) {
                event.effectAllowed = "copy";
                event.preventDefault();
                event.stopPropagation();
                $dragwrapper.addClass('drag');

            });
            $dragwrapper.on('dragleave', function(event) {
                event.preventDefault();
                event.stopPropagation();
                $dragwrapper.removeClass('drag');

            });
            $dragwrapper.on('drop', function(event) {
                event.preventDefault();
                event.stopPropagation();
                console.log(event.originalEvent.dataTransfer.files);
                var files = event.originalEvent.dataTransfer.files,
                    fileLen = files.length;
                var templataData = {
                    "code": gccode,
                    "goods": fileLen
                };
                $shopsMenuWrapper.html(biuldAddSubMenuTemplata.render(templataData));
                /*dom结构加载之后就可进行事件的绑定*/
                $shopsMenuWrapper.trigger('readyAddGoods', [files, gccode]);
                var $imgs = $shopsMenuWrapper.find('img');
                $imgs.on('load', function(event) {
                    $shopsMenuWrapper.masonry({
                        itemSelector: '.hreviewra',
                        isAnimated: true
                    });
                });
                /*递归加载图片*/
                (function loadImgs(i) {
                    var reader = new FileReader();
                    reader.readAsDataURL(files.item(i));
                    reader.onload = function(event) {
                        $imgs[i].src = event.target.result;
                        loadImgs(++i);
                    }
                }(0));
            });
        });
    }

    function removeMenu(node) {
        node.remove();
    }

    function initAddGoods() {
        $shopsMenuWrapper.on('readyAddGoods', function(event, files, code) {
            var $toAddGoods = $shopsMenuWrapper.find("#toAddGoods");
            var pushData = function($arr, arr) {
                $arr.each(function(i, item) {
                    var value = encode($(item).val());
                    console.log(value);
                    if (!!value) {
                        arr.push(value);
                    }
                });
            };
            var checkeValues = function(values) {
                var arr = [];
                for (var i = 0, len = values.length; i < len; i++) {
                    arr[i] = values[i].length;
                }
                var base = arr[0];
                console.log('arr:');
                console.log(arr);
                for (var h = 1, l = arr.length; h < l; h++) {
                    if (base != arr[h]) {
                        return false;
                        break;

                    }
                }
                return true;
            };
            var pushOk = function() {
                $load.hide();
                $curGlassLink.trigger('click');
                console.log("推送完成！");
            }
            $toAddGoods.on('click', function(event) {
                $load.show();
                var posturl = "/goods",
                    dataLength = files.length;
                var names = [],
                    prices = [],
                    descriptions = [];
                $msgWra = $shopsMenuWrapper.find('.hreviewra');
                $gnames = $shopsMenuWrapper.find('.goodsmsg>.gname');
                $gprice = $shopsMenuWrapper.find('.goodsmsg>.gprice');
                $gdescription = $shopsMenuWrapper.find('.goodsmsg>.gdescription');
                pushData($gnames, names);
                pushData($gprice, prices);
                pushData($gdescription, descriptions);
                if (!checkeValues([files, names, prices, descriptions])) {
                    alert('信息填写不完整！');
                    return;
                }
                (function pushToSever(index) {
                    var formdata = new FormData();
                    formdata.append('files', files[index])
                    formdata.append("code", code);
                    formdata.append("name", names[index]);
                    formdata.append("price", prices[index]);
                    formdata.append("description", descriptions[index]);
                    $.ajax({
                        url: posturl,
                        type: 'POST',
                        data: formdata,
                        /*要设置回调参数的类型*/
                        dataType: "text",
                        processData: false,
                        contentType: false,
                        success: function(responseStr) {
                            formdata = null;
                            // removeMenu($msgWra[index]);
                            if (++index < dataLength) {
                                pushToSever(index);
                            } else {
                                pushOk();
                            }
                        },
                        error: function(responseStr) {
                            console.log("错误:" + responseStr);
                        }
                    });
                })(0);
            });
        });
    }
});
