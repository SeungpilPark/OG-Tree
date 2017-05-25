/**
 * Doosan html view Handler
 *
 * @class
 *
 * @author <a href="mailto:sppark@uengine.org">Seungpil Park</a>
 */
var EditorViewController = function () {
    /**
     * OG-Tree 클래스
     * @type {Tree}
     */
    this.tree = null;

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
EditorViewController.prototype = {
    /**
     * Html 페이지가 처음 로딩되었을 때 오픈그래프 트리를 활성화하고, 필요한 데이터를 인티그레이션 한다.
     */
    init: function () {
        var me = this;
        me.tree = new EditorRenderer('canvas');
        if (editorMode) {
            me.tree._CONFIG.MOVE_SORTABLE = true;
            me.tree._CONFIG.MAPPING_ENABLE = true;
            me.tree._CONFIG.CREATE_FOLDER = true;
            me.tree._CONFIG.CREATE_ED = true;
            me.tree._CONFIG.PICK_ED = true;
            me.tree._CONFIG.DELETABLE = true;
            me.tree._CONFIG.AREA.lAc.display = true;
            me.tree._CONFIG.AREA.lOut.display = true;
            me.tree._CONFIG.AREA.rIn.display = true;
            me.tree._CONFIG.AREA.rAc.display = true;
            me.tree._CONFIG.AREA.rOut.display = true;
        } else {
            me.tree._CONFIG.MOVE_SORTABLE = false;
            me.tree._CONFIG.MAPPING_ENABLE = false;
            me.tree._CONFIG.CREATE_FOLDER = false;
            me.tree._CONFIG.CREATE_ED = false;
            me.tree._CONFIG.PICK_ED = false;
            me.tree._CONFIG.DELETABLE = false;
            me.tree._CONFIG.AREA.lAc.display = false;
            me.tree._CONFIG.AREA.lOut.display = false;
            me.tree._CONFIG.AREA.rIn.display = true;
            me.tree._CONFIG.AREA.rAc.display = true;
            me.tree._CONFIG.AREA.rOut.display = true;

            //좌우 여백 채움 프로퍼티
            me.tree._CONFIG.AREA.rIn.fit = 'left';
            me.tree._CONFIG.AREA.rOut.fit = 'right';
        }
        me.tree.init();

        if (parent.top.aras) {
            me.aras = new DataController(me.tree, null, me);
            me.aras.init();
            me.aras.initResize();

            //스탠다드 모드에서는 PICK ED 와 CREATE ED 를 설정하도록 한다.
            if (me.aras.stdYN == 'Y') {
                me.tree._CONFIG.PICK_ED = false;

                //2016-10-19 요청에 의해 스탠다드 모드일때 CREATE_ED 막음.
                me.tree._CONFIG.CREATE_ED = false;
            }

            var innerMode = me.aras.getHtmlParameter('mode');
            if (innerMode) {
                $('.header-info').hide();
            }

            if (editorMode) {
                //셀렉트 박스 이벤트를 걸고 초기데이터를 불러온다.
                me.bindSelectBoxEvent();
                me.aras.getSchCombo('Init', null, null, null, null, function (err, res) {
                    if (res) {
                        me.renderSelectBox(res);
                    }
                });
            }

            var headerItem = me.aras.getWorkflowHeader(me.aras.wfId);
            if (headerItem.getItemCount() == 1) {
                me.renderHeaders(headerItem, 'my');
            }
            me.aras.refreshMyWorkFlow();

            /**
             * GUI 상에서 액티비티가 이동하기 전의 핸들러
             * @param activities
             */
            me.tree.onBeforeActivityMove = function (activities) {
                var activityIds = [];
                for (var i = 0; i < activities.length; i++) {
                    activityIds.push(activities[i].id);
                }
                me.aras.sortActivities(activityIds);

                return false;
            };
            /**
             * GUI 상에서 액티비티가 이동한 후의 핸들러
             * @param activities
             */
            me.tree.onActivityMove = function (activities) {
                console.log(activities);
            };
            /**
             * GUI 상에서 매핑이 되기 전의 핸들러
             * @param source
             * @param target
             * @returns {boolean}
             */
            me.tree.onBeforeMapping = function (source, target, selectedTargetList) {

                //아라스에서는 소스와 타겟이 반대
                me.aras.addInRel(target, source, selectedTargetList);
                return false;
            };

            /**
             * GUI 상에서 매핑이 이루어졌을 때 핸들러
             * @param source
             * @param target
             */
            me.tree.onMapping = function (source, target, selectedTargetList) {
                console.log(source, target, selectedTargetList);
            };

            /**
             * GUI 상에서 매핑이 삭제되기 전 핸들러
             * @param sourceId
             * @param targetId
             */
            me.tree.onBeforeDeleteMapping = function (sourceId, sourceType, targetId, targetType) {
                var modal = $('#deleteConfirm');
                modal.find('[name=action]').unbind('click');
                modal.find('[name=close]').unbind('click');
                modal.find('[name=close]').bind('click', function () {
                    modal.find('.close').click();
                });
                modal.find('[name=action]').bind('click', function () {
                    modal.find('.close').click();
                    //아라스에서는 소스와 타겟이 반대
                    me.aras.deleteInRel(targetId, targetType, sourceId, sourceType);
                });
                modal.modal({
                    show: true
                });
                return false;
            };

            /**
             * GUI 상에서 매핑이 삭제되었을 때의 핸들러
             * @param sourceId
             * @param targetId
             */
            me.tree.onDeleteMapping = function (sourceId, sourceType, targetId, targetType) {
                console.log(sourceId, sourceType, targetId, targetType);
            };

            /**
             * 프로퍼티 보기 콘텍스트 클릭시
             * @param data
             * @param view
             */
            me.tree.onShowProperties = function (data, view) {
                var id, type;
                if (data.type == me.tree.Constants.TYPE.MAPPING) {
                    id = data.source;
                    type = data.sourceType;
                } else {
                    id = data.id;
                    type = data.type;
                }
                me.aras.showPropertyWindow(type, id);
            };
            /**
             * Ed 생성 콘텍스트 클릭시
             * @param data
             * @param view
             */
            me.tree.onMakeEd = function (data, view, edType) {
                me.aras.createEd(data, view, edType);
            };

            /**
             * 폴더 생성 콘텍스트 클릭시
             * @param data
             * @param view
             */
            me.tree.onMakeFolder = function (data, view) {
                me.aras.createFolder(data, view);
            };

            /**
             * 액티비티 생성 콘텍스트 버튼 클릭시
             */
            $('#newActivity').click(function () {
                me.aras.createActivity();
            });

            /**
             * 리프레쉬 버튼 클릭시
             */
            $('#refresh').click(function () {
                me.aras.refreshAll();
            });

            /**
             * 폴더 또는 ED 또는 액티비티 삭제 콘텍스트 클릭시
             * @param data
             * @param view
             */
            me.tree.onDelete = function (data, view) {
                var modal = $('#deleteConfirm');
                modal.find('[name=action]').unbind('click');
                modal.find('[name=close]').unbind('click');
                modal.find('[name=close]').bind('click', function () {
                    modal.find('.close').click();
                });
                modal.find('[name=action]').bind('click', function () {
                    modal.find('.close').click();
                    me.aras.deleteOutItem(data, view);
                });
                modal.modal({
                    show: true
                });
            };
            /**
             * 폴더 또는 ED 를 input 으로 쓰는 모든 Workflow - Activity 리스트를 보여주기
             * @param data
             * @param view
             */
            me.tree.onListRelation = function (data, view) {
                var id, type, dt;
                if (data.type == me.tree.Constants.TYPE.MAPPING) {
                    id = data.source;
                    type = data.sourceType;
                } else {
                    id = data.id;
                    type = data.type;
                }

                var dataSet = me.aras.getEdParentList(id, me.tree.Constants.TYPE.ED == type ? 'Y' : 'N');

                for (var i = 0; i < dataSet.length; i++) {
                    dataSet[i]['label'] = '<a href="#" name="listRelObj" data-index="' + i + '">' + dataSet[i]['name'] + '</a>';
                    dataSet[i]['process_id'] = dataSet[i]['process_id'] ? dataSet[i]['process_id'] : '';
                    dataSet[i]['wf_name'] = dataSet[i]['wf_name'] ? dataSet[i]['wf_name'] : '';
                    dataSet[i]['item_number'] = dataSet[i]['item_number'] ? dataSet[i]['item_number'] : '';
                    dataSet[i]['activity_owner'] = dataSet[i]['activity_owner'] ? dataSet[i]['activity_owner'] : '';
                    dataSet[i]['eng_funtion_structure'] = dataSet[i]['eng_funtion_structure'] ? dataSet[i]['eng_funtion_structure'] : '';
                }

                if (!me.listRelGrid) {
                    dt = new uengineDT($('#listRelGrid'),
                        {
                            select: {
                                style: 'single'
                            },
                            columns: [
                                {data: 'process_id', title: 'Process ID', defaultContent: ''},
                                {data: 'wf_name', title: 'Workflow Name', defaultContent: ''},
                                {data: 'item_number', title: 'Activity ID', defaultContent: ''},
                                {
                                    data: 'label', title: 'Activity Name', defaultContent: '',
                                    event: {
                                        click: function (key, value, rowValue, rowIdx, td) {
                                            me.aras.showPropertyWindow(me.tree.Constants.TYPE.ACTIVITY, rowValue['id']);
                                        }
                                    }
                                },
                                {data: 'activity_owner', title: 'Owner', defaultContent: ''},
                                {data: 'eng_funtion_structure', title: 'Eng Func Struct', defaultContent: ''}
                            ],
                            pageLength: 10,
                            info: true,
                            responsive: true,
                            dom: '<"html5buttons"B>lTfgitp',
                            buttons: [
                                {extend: 'copy'},
                                {extend: 'csv'},
                                {extend: 'excel', title: 'ExampleFile'},
                                {extend: 'pdf', title: 'ExampleFile'},
                                {
                                    extend: 'print',
                                    customize: function (win) {
                                        $(win.document.body).addClass('white-bg');
                                        $(win.document.body).css('font-size', '10px');

                                        $(win.document.body).find('table')
                                            .addClass('compact')
                                            .css('font-size', 'inherit');
                                    }
                                }
                            ]
                        });
                    me.listRelGrid = dt;
                }
                me.listRelGrid.renderGrid(dataSet);

                var modal = $('#listRelModal');
                modal.modal({
                    show: true
                });
            };
            /**
             * 선택 된 폴더에 연결할 ED 리스트를 불러오기(Pick ed) 콘텍스트 클릭시
             * @param data
             * @param view
             */
            me.tree.onPickEd = function (data, view) {
                if (!me.aras.checkMaxCreateNumber(view.depth)) {
                    return;
                }

                var dt;
                var getData = function () {
                    var pickEdNumber = $('#pickEdNumber').val();
                    var pickEdName = $('#pickEdName').val();
                    var dataSet = me.aras.getPickEd(pickEdNumber, pickEdName);
                    for (var i = 0; i < dataSet.length; i++) {
                        dataSet[i]['label'] =
                            '<i class="fa fa-search-plus"></i>&nbsp;<a href="Javascript:void(0)" name="statusBtn">' + dataSet[i]['name'] + '</a>';
                        dataSet[i]['ed_type'] = dataSet[i]['ed_type'] ? dataSet[i]['ed_type'] : '';
                        dataSet[i]['rel_project'] = dataSet[i]['rel_project'] ? dataSet[i]['rel_project'] : '';
                        dataSet[i]['state'] = dataSet[i]['state'] ? dataSet[i]['state'] : '';
                        dataSet[i]['class'] = dataSet[i]['class'] ? dataSet[i]['class'] : '';
                    }
                    return dataSet;
                };

                if (!me.pickEdGrid) {
                    dt = new uengineDT($('#pickEdGrid'),
                        {
                            select: true,
                            columns: [
                                {
                                    data: 'label', title: 'Name', defaultContent: '',
                                    event: {
                                        click: function (key, value, rowValue, rowIdx, td) {
                                            me.aras.showPropertyWindow(me.tree.Constants.TYPE.ED, rowValue['id']);
                                        }
                                    }
                                },
                                {data: 'ed_type', title: 'Type', defaultContent: ''},
                                {data: 'rel_project', title: 'Project', defaultContent: ''},
                                {data: 'state', title: 'State', defaultContent: ''},
                                {data: 'class', title: 'Class', defaultContent: ''}
                            ],
                            pageLength: 10,
                            info: true,
                            responsive: true,
                            dom: '<"html5buttons"B>lTfgitp',
                            buttons: [
                                {extend: 'copy'},
                                {extend: 'csv'},
                                {extend: 'excel', title: 'ExampleFile'},
                                {extend: 'pdf', title: 'ExampleFile'},
                                {
                                    extend: 'print',
                                    customize: function (win) {
                                        $(win.document.body).addClass('white-bg');
                                        $(win.document.body).css('font-size', '10px');

                                        $(win.document.body).find('table')
                                            .addClass('compact')
                                            .css('font-size', 'inherit');
                                    }
                                }
                            ]
                        });
                    me.pickEdGrid = dt;
                }

                me.pickEdGrid.renderGrid(getData());

                var modal = $('#pickEdModal');
                modal.find('[name=search]').unbind('click');
                modal.find('[name=action]').unbind('click');
                modal.find('[name=action]').bind('click', function () {
                    modal.find('.close').click();
                    var folderItem = me.aras.getItemById(me.aras.TYPE.FOLDER, data.id);
                    var edItems = [];
                    var selected = me.pickEdGrid.getDt().rows({selected: true}).data();
                    for (var i = 0; i < selected.length; i++) {
                        var edItem = me.aras.getItemById(me.aras.TYPE.ED, selected[i].id);
                        edItems.push(edItem);
                    }
                    if (edItems.length) {
                        me.aras.addPickEDOutRelation(edItems, folderItem, data, view);
                    }
                });
                modal.find('[name=search]').bind('click', function () {
                    me.pickEdGrid.renderGrid(getData());
                });
                modal.modal({
                    show: true
                });
            };
        } else {
            if (me.mode == 'random') {
                me.renderRandomData();
            } else {
                me.renderSampleData();
            }
        }

        me.renderStateBox();

        $('#labelSwitch').click(function () {
            var swich = $(this);
            if (!swich.data('data')) {
                swich.data('data', 'on');
            }
            if (swich.data('data') == 'on') {
                swich.data('data', 'off');
                me.tree.setShowLabel(false);
            } else {
                swich.data('data', 'on');
                me.tree.setShowLabel(true);
            }
        });


        $('#zoomIn').click(function () {
            var scale = me.tree.getScale();
            var reScale = scale + 0.1;
            if (reScale > 3) {
                return;
            } else {
                me.tree.setScale(reScale);
            }
        });
        $('#zoomOut').click(function () {
            var scale = me.tree.getScale();
            var reScale = scale - 0.1;
            if (reScale < 0.2) {
                return;
            } else {
                me.tree.setScale(reScale);
            }
        });
        $('#zoomFit').click(function () {
            me.tree.setScale(1);
        });

        //소트 이벤트
        $('.sortBar').find('button').each(function () {
            $(this).click(function () {
                $('.sortBar').find('button').removeClass('active');
                $(this).addClass('active');

                var btn = $(this);
                var key = $(this).data('key');
                var order = $(this).data('order');
                if (order == 'asc') {
                    order = 'desc';
                    btn.data('order', 'desc');
                    btn.find('i').removeClass('fa-caret-square-o-down');
                    btn.find('i').addClass('fa-caret-square-o-up');
                } else {
                    order = 'asc';
                    btn.data('order', 'asc');
                    btn.find('i').addClass('fa-caret-square-o-down');
                    btn.find('i').removeClass('fa-caret-square-o-up');
                }
                me.tree.sortData(key,
                    [me.tree.Constants.POSITION.OTHER_OUT,
                        me.tree.Constants.POSITION.MY_IN,
                        me.tree.Constants.POSITION.MY_OUT],
                    order == 'desc');
            });
        });
    },
    /**
     * discipline, disciplineSpec, bg, 아더 워크플로우 셀렉트 박스 이벤트를 등록한다.
     */
    bindSelectBoxEvent: function () {
        var me = this;
        var reload = function () {
            me.aras.getSchCombo('', $("#discipline").val(), $("#disciplineSpec").val(), $("#bg").val(), '', function (err, res) {
                me.renderOtherWorkFlowBox(res);
            });
        };
        $('#discipline').change(function () {
            reload();
        });

        $('#disciplineSpec').change(function () {
            reload();
        });

        $('#bg').change(function () {
            reload();
        });

        $('#targetOtherWorkflow').change(function () {
            var wfId = $('#targetOtherWorkflow').val();
            if (wfId && wfId != '') {
                var headerItem = me.aras.getWorkflowHeader(wfId);
                if (headerItem.getItemCount() == 1) {
                    me.renderHeaders(headerItem, 'other');
                }
                me.aras.refreshOtherWorkflow(wfId);

                //마이 워크플로우도 함꼐 리프레쉬 해준다.
                me.aras.refreshMyWorkFlow();
            }
        });
    },
    /**
     * 주어진 데이터로 discipline, disciplineSpec, bg 셀렉트 박스를 구성한다.
     * @param data json
     */
    renderSelectBox: function (data) {
        var me = this;
        var json = JSON.parse(data.d);

        if (json['rtn']) {
            var discipline = JSON.parse(json['data']);
            var disciplineSpec = JSON.parse(json['data1']);
            var bg = JSON.parse(json['data2']);

            for (var key in discipline.data) {
                me.appendSelectBoxElement($('#discipline'), discipline.data[key].LABEL, discipline.data[key]['VALUE']);
            }

            for (var key in disciplineSpec.data) {
                me.appendSelectBoxElement($('#disciplineSpec'), disciplineSpec.data[key].LABEL, disciplineSpec.data[key]['VALUE']);
            }

            for (var key in bg.data) {
                me.appendSelectBoxElement($('#bg'), bg.data[key].LABEL, bg.data[key]['VALUE']);
            }

            //최초의 워크플로우 리스트를 불러와준다.
            me.aras.getSchCombo('', $("#discipline").val(), $("#disciplineSpec").val(), $("#bg").val(), '', function (err, res) {
                me.renderOtherWorkFlowBox(res);
            });
        }
    },
    /**
     * 주어진 데이터로 아더 워크플로우 셀렉트 박스를 구성한다.
     * @param data json
     */
    renderOtherWorkFlowBox: function (data) {
        var me = this;
        var json = JSON.parse(data.d);
        if (json['rtn']) {
            var otherWorkFlows = JSON.parse(json['data']);
            $('#targetOtherWorkflow').find('option').remove();
            me.appendSelectBoxElement($('#targetOtherWorkflow'), '--Workflow--', '');
            for (var key in otherWorkFlows.data) {
                me.appendSelectBoxElement($('#targetOtherWorkflow'), otherWorkFlows.data[key]['LABEL'], otherWorkFlows.data[key]['VALUE']);
            }
        }
    },
    /**
     * 주어진 데이터로 셀렉트 박스 내부에 option 을 생성한다.
     * @param element 셀렉트 박스 Dom element
     * @param label option display value
     * @param value option value
     */
    appendSelectBoxElement: function (element, label, value) {
        element.append('<option value="' + value + '">' + label + '</option>');
    },
    /**
     * Html 페이지의 헤더 부분에 프로젝트 정보를 표기한다.
     * @param headerItem
     * @param myOther
     */
    renderHeaders: function (headerItem, myOther) {
        var targetTableClass = myOther == 'other' ? 'other-table' : 'my-table';
        var targetTable = $('.' + targetTableClass);

        var project_code = headerItem.getProperty('project_code', '');
        var process_id = headerItem.getProperty('process_id', '');
        var pjt_name = headerItem.getProperty('pjt_name', '');
        var processname = headerItem.getProperty('processname', '');
        var sub_processname = headerItem.getProperty('sub_processname', '');
        targetTable.find('[name=project_code]').html(project_code);
        targetTable.find('[name=process_id]').html(process_id);
        targetTable.find('[name=pjt_name]').html(pjt_name);
        targetTable.find('[name=processname]').html(processname);
        targetTable.find('[name=sub_processname]').html(sub_processname);
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
        $.getJSON("common/sampleData/myData.json", function (myData) {

            //me.tree._INCOLLAPSE = [];
            me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.MY});
            me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.MY_IN});
            me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.MY_OUT});
            me.tree.updateData(myData, true);

            $.getJSON("common/sampleData/otherData.json", function (otherData) {
                me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.OTHER});
                me.tree.removeDataByFilter({position: me.tree.Constants.POSITION.OTHER_OUT});
                me.tree.updateData(otherData);
            });
        });
    },
    /**
     * Dev 모드일시 랜덤 데이터를 오픈그래프 트리에 반영한다.
     */
    renderRandomData: function () {
        var me = this;
        var otherData = me.randomData('other');
        var myData = me.randomData('my');
        me.tree.updateData(otherData, true);
        me.tree.updateData(myData);
    },

    /**
     * 오픈그래프 트리 데이터를 랜덤하게 생성한다.
     * @param type other,my
     * @returns {Array} json
     */
    randomData: function (type) {
        var data = {};
        var randomCount = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        var randomType = function () {
            var number = Math.floor(Math.random() * (2));
            if (number == 0) {
                return 'folder';
            } else {
                return 'ed';
            }
        };

        //var random = randomCount() + 1;
        for (var i = 0; i < 10; i++) {
            console.log('=====Activity : ' + i + ' ===========');

            var id = type + "-ac-" + i;
            var activity = {
                "type": "activity",
                "id": id,
                "name": type + "-ac-" + i + "-Activity",
                "position": type,
                "parentId": "",
                "expand": true,
                "extData": {}
            };
            if (i < 9) {
                activity.next = type + "-ac-" + (i + 1);
            }
            if (i > 0) {
                activity.prev = type + "-ac-" + (i - 1);
            }
            data[id] = activity;
            var maxDepth = 7;
            var createdData = [activity];
            for (var c = 0; c < maxDepth; c++) {
                var copyData = JSON.parse(JSON.stringify(createdData));
                createdData = [];
                for (var g = 0; g < copyData.length; g++) {
                    var child, childId;
                    var parent = copyData[g];
                    var childType = randomType();
                    if (c == 0) {
                        childType = 'folder';
                    }
                    var randomChildNum = randomCount(1, 3);
                    if (childType != 'folder') {
                        randomChildNum = randomCount(1, 5);
                    }
                    for (var m = 0; m < randomChildNum; m++) {
                        if (childType == 'folder') {
                            childId = type + "-fd-" + i + '-' + c + '-' + g + '-' + m;
                            child = {
                                "type": childType,
                                "id": childId,
                                "name": type + "-fd-" + i + '-' + c + '-' + g + '-' + m + "-Folder",
                                "position": type + "-out",
                                "parentId": parent.id,
                                "expand": true,
                                "extData": {}
                            };
                            createdData.push(child);
                            data[childId] = child;
                        } else {
                            childId = type + "-ed-" + i + '-' + c + '-' + g + '-' + m;
                            child = {
                                "type": childType,
                                "id": childId,
                                "name": type + "-ed-" + i + '-' + c + '-' + g + '-' + m + "-Ed",
                                "position": type + "-out",
                                "parentId": parent.id,
                                "expand": true,
                                "extData": {}
                            };
                            data[childId] = child;
                        }
                    }
                }
            }
        }
        return data;
    }
}
;
EditorViewController.prototype.constructor = EditorViewController;

$(function () {
    var viewController = new EditorViewController();
    viewController.init();
});