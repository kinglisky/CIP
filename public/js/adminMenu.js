$(document).ready(function() {
    var setAction = function(action) {
        if (action) {
            return action;
        }
        return "/cmenu";
    };
    var cutDescription = function(description) {
        return description.substr(0, 50)+'......';
    }
        /*为模板注册辅助函数*/
    juicer.register('setAction', setAction);
    juicer.register('cutDescription', cutDescription);
    var $menuModule = $('#MenuModule'),
        $smenuModule = $('#SMenuModule'),
        $tmenuModule = $('#TMenuModule');
    var menuTemplata = $('#menuTemplata').html(),
        toBiudMenu = juicer(menuTemplata);
    var tmenuTemplata = $('#tmenuTemplata').html(),
        toBiudTMenu = juicer(tmenuTemplata);
    var dragTemplata = $('#dragTemplata').html(),
        toBiudDrag = juicer(dragTemplata);
    var curTMenuLink = {};
    (function init() {
        $smenuModule.hide();
        $tmenuModule.hide();
        $tmenuModule.find('.load').hide();
        initMenu();
        initReturnMenu();
        initDragToAdd();
        initAddMenu();
    })();
    /*用于转义特殊字符*/
    function initReturnMenu() {
        $smenuModule.find('.returnMenu').on('click', function(event) {
            $smenuModule.hide(1000);
            $menuModule.show(1000);
        });
        $tmenuModule.find('.returnmenu').on('click', function(event) {
            $tmenuModule.hide(1000);
            $smenuModule.show(1000);
        });
    }

    function initMenu() {
        $.getJSON("/cmenu", function(data) {
            console.log(data);
            var html = toBiudMenu.render({
                "action": false,
                "geturl": "/scmenu",
                "menus": data,
                "durl": "/cmenu"
            });
            $menuModule.find('.mwrapper').html(html);
            $menuModule.find('.pushMenu').on('submit', function(event) {
                event.preventDefault();
                var self = $(this);
                var action = self.attr('action'),
                    pdata = ecode(self.serialize());
                console.log('推送的数据地址为:' + action);
                console.log(pdata);
                $.post(action, pdata, function(data) {
                    if (data == "Ye") {
                        initMenu();
                    } else {
                        alert(data);
                    }
                });
            });
            $menuModule.on('click', '.features-item>a', function(event) {
                event.preventDefault();
                $menuModule.hide(1000);
                $smenuModule.show(1000);
                var url = $(this).attr('href'),
                    mcode = $(this).data("code");
                initSubMenu(url, mcode);
            });
            $menuModule.on('click', '.btn-group>a', function(event) {
                event.preventDefault();
                // alert($(this).attr('href'));
                $.get($(this).attr('href'), function(data) {
                    if (data == "Ye" || data == "No") {
                        console.log(data);
                        initMenu();
                    } else {
                        alert(data);
                    }
                });
            });
        });
    }

    function initSubMenu(url, mcode) {
        console.log("url:" + url);
        $.getJSON(url, function(data) {
            var html = toBiudMenu.render({
                "menus": data,
                "action": "/scmenu",
                "geturl": "/tcmenu",
                "mcode": mcode,
                "durl": "/scmenu"
            });
            $smenuModule.find('.mwrapper').html(html);
            $smenuModule.find('.pushMenu').on('submit', function(event) {
                event.preventDefault();
                var self = $(this);
                var action = self.attr('action'),
                    pdata = ecode(self.serialize());
                console.log('推送的数据地址为:' + action);
                console.log(pdata);
                $.post(action, pdata, function(data) {
                    if (data == "Ye") {
                        initSubMenu(url, mcode);
                    } else {
                        alert(data);
                    }
                });
            });
            $smenuModule.on('click', '.features-item>a', function(event) {
                event.preventDefault();
                $smenuModule.hide(1000);
                $tmenuModule.show(1000);
                curTMenuLink = $(this);
                var url = $(this).attr('href'),
                    code = $(this).data("code"),
                    mcode = $smenuModule.find('#hmcode').val();
                console.log("最初的-1:" + mcode + " 2:" + code);
                initThrMenu(mcode, code, url);
            });
            $smenuModule.on('click', '.btn-group>a', function(event) {
                event.preventDefault();
                $.get($(this).attr('href'), function(data) {
                    if (data == "Ye") {
                        initSubMenu(url, mcode);
                    } else {
                        alert(data);
                    }
                });
            });
        });
    }

    function initThrMenu(mmcode, mcode, url) {
        console.log("三级目录geturl：" + url);
        var baseurl = url;
        $.getJSON(url, function(data) {
            var html = toBiudTMenu.render({
                "menus": data,
                "durl": "/tcmenu"
            });
            var $mwrapper = $tmenuModule.find('.mwrapper').empty().html(html);
            $mwrapper.one('click', '.btn-group>a', function(event) {
                event.preventDefault();
                var url = $(this).attr('href');
                console.log("我被触发了吗？");
                $.get(url, function(data) {
                    console.log("有发出请求哦！" + url);
                    if (data == "Ye") {
                        // initThrMenu(mmcode, mcode, baseurl);
                        curTMenuLink.trigger('click');
                    } else if (data == "No") {
                        console.log("原因不明");
                    } else {
                        alert(data);
                    }
                });
            });
            var $imgs = $mwrapper.find('img');
            $mwrapper.masonry('reloadItems');
            $imgs.on('load', function(event) {
                $mwrapper.masonry({
                    itemSelector: '.hreviewra',
                    isAnimated: true
                });
            });
            $tmenuModule.trigger("readyDrag", [mmcode, mcode]);

        });
    }

    function initDragToAdd() {
        $tmenuModule.on('readyDrag', function(event, mmcode, mcode) {
            console.log("拖拽事件初始化。。。");
            var $mwrapper = $tmenuModule.find('.mwrapper');
            var $dragwrapper = $mwrapper.find('#dragwrapper');
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
                    "menus": fileLen
                };
                $mwrapper.html(toBiudDrag.render(templataData));
                /*dom结构加载之后就可进行事件的绑定*/
                $tmenuModule.trigger('readyAddMenu', [files, mmcode, mcode]);
                var $imgs = $mwrapper.find('img');
                $imgs.on('load', function(event) {
                    $mwrapper.masonry('reloadItems');
                    $mwrapper.masonry({
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

    function initAddMenu() {
        $tmenuModule.on('readyAddMenu', function(event, files, mmcode, mcode) {
            console.log(files);
            var $mwrapper = $tmenuModule.find('.mwrapper');
            var $toAddGoods = $mwrapper.find("#toAddGoods");
            var pushData = function($arr, arr) {
                $arr.each(function(i, item) {
                    var value = encode($(item).val());
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
                $tmenuModule.find('.load').hide();
                curTMenuLink.trigger('click');
            }
            $toAddGoods.on('click', function(event) {

                var posturl = "/tcmenu",
                    dataLength = files.length;
                var names = [],
                    descriptions = [];
                $gnames = $mwrapper.find('.tmenumsg>.name');
                $gdescription = $mwrapper.find('.tmenumsg>.description');
                pushData($gnames, names);
                pushData($gdescription, descriptions);
                if (!checkeValues([files, names, descriptions])) {
                    alert('信息填写不完整！');
                    return;
                }
                $tmenuModule.find('.load').show();
                (function pushToSever(index) {
                    var formdata = new FormData();
                    formdata.append("mmcode", mmcode);
                    formdata.append("mcode", mcode);
                    formdata.append('files', files[index]);
                    formdata.append("name", names[index]);
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
