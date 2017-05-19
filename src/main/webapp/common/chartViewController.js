/**
 * Doosan html view Handler
 *
 * @class
 *
 * @author <a href="mailto:sppark@uengine.org">Seungpil Park</a>
 */
var ChartViewController = function () {
    /**
     * ChartRenderer 클래스
     * @type {Tree}
     */
    this.renderer = null;

    /**
     * Aras 클래스
     * @type {Aras}
     */
    this.aras = null;

    /**
     * Dev 모드
     * @type {string}
     */
    this.mode = 'sample'; //random,sample
};
ChartViewController.prototype = {
    /**
     * Html 페이지가 처음 로딩되었을 때 차크 렌더러를 활성화하고, 데이터를 불러온다.
     */
    init: function () {
        var me = this;
        me.renderer = new ChartRenderer('canvas');
        me.renderer.init();

        if (parent.top.aras) {
            me.aras = new DataController(null, me.renderer, me);
            me.aras.init();

        } else {
            me.renderSampleData();
        }

        me.renderStateBox();

        $('#zoomIn').click(function () {
            var scale = me.renderer.getScale();
            var reScale = scale + 0.1;
            if (reScale > 3) {
                return;
            } else {
                me.renderer.setScale(reScale);
            }
        });
        $('#zoomOut').click(function () {
            var scale = me.renderer.getScale();
            var reScale = scale - 0.1;
            if (reScale < 0.2) {
                return;
            } else {
                me.renderer.setScale(reScale);
            }
        });
        $('#zoomFit').click(function () {
            me.renderer.setScale(1);
        });

    },
    /**
     * common/state.json 에 저장된 스테이터스 데이터를 불러와 스테이터스 박스를 구성한다.
     */
    renderStateBox: function () {
        var me = this;
        var stdYN = 'N';
        var stateJson;
        if (me.aras && me.aras.stdYN) {
            stdYN = me.aras.stdYN;
        }
        $.ajax({
            type: 'GET',
            url: 'common/state.json',
            dataType: 'json',
            async: false,
            success: function (data) {
                stateJson = data;
            }
        });
        var stateColorBox = $('.state-color');
        var renderState = function (name, color, stroke) {
            var bar = $('<li><a href="Javascript:void(0)"><div class="state-bar">&nbsp;</div>' + name + '</a></li>');
            stateColorBox.append(bar);
            if (stroke) {
                bar.find('.state-bar').css('border', '1px solid ' + stroke);
            }
            if (color) {
                bar.find('.state-bar').css('background-color', color);
            }
        };
        var renderSeparator = function () {
            stateColorBox.append('<li role="separator" class="divider"></li>');
        };
        var renderTitle = function (title) {
            stateColorBox.append('<li><a href="Javascript:void(0)">---' + title + '---</a></li>');
        };
        if (stateJson) {
            stateColorBox.html('');
            var stateList = [];
            if (stdYN == 'Y') {
                stateList = stateJson['Standard'];
                for (var i = 0; i < stateList.length; i++) {
                    renderState(stateList[i]['name'], stateList[i]['color'], stateList[i]['stroke']);
                }
            } else {
                renderTitle('Activity');
                stateList = stateJson['Project']['Activity'];
                for (var i = 0; i < stateList.length; i++) {
                    renderState(stateList[i]['name'], stateList[i]['color'], stateList[i]['stroke']);
                }
                renderSeparator();

                renderTitle('Folder');
                stateList = stateJson['Project']['Folder'];
                for (var i = 0; i < stateList.length; i++) {
                    renderState(stateList[i]['name'], stateList[i]['color'], stateList[i]['stroke']);
                }
                renderSeparator();

                renderTitle('EDB');
                stateList = stateJson['Project']['EDB'];
                for (var i = 0; i < stateList.length; i++) {
                    renderState(stateList[i]['name'], stateList[i]['color'], stateList[i]['stroke']);
                }
                renderSeparator();
            }
        }
    },
    /**
     * Dev 모드일시 개발용 샘플 데이터를 오픈그래프 트리에 반영한다.
     */
    renderSampleData: function () {
        var me = this;
        //me.renderer.updateData(null, true);
        // $.getJSON("common/sampleData/myData.json", function (myData) {
        //
        //     //me.tree._INCOLLAPSE = [];
        //     me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.MY});
        //     me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.MY_IN});
        //     me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.MY_OUT});
        //     me.tree.updateData(myData, true);
        //
        //     $.getJSON("common/sampleData/otherData.json", function (otherData) {
        //         me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.OTHER});
        //         me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.OTHER_OUT});
        //         me.tree.updateData(otherData);
        //     });
        // });
    }
}
;
ChartViewController.prototype.constructor = ChartViewController;

$(function () {
    var viewController = new ChartViewController();
    viewController.init();
});
