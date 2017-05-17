/**
 * Created by Seungpil Park on 2016. 9. 6..
 */
var uengineDT = function (panel, gridOptions) {
    this.panel = panel;
    this.gridOptions = gridOptions;
    this.dt = null;
    this.gridData = null;
};
uengineDT.prototype = {
    getDt: function () {
        return this.dt;
    },
    getPanel: function () {
        return this.panel;
    },
    getData: function () {
        return this.gridData;
    },
    getOptions: function () {
        return this.gridOptions;
    },
    getApi: function () {
        return this.panel.dataTable().api();
    },

    redrawData: function (gridData) {
        this.gridData = gridData;
        var dataTable = this.panel.dataTable().api();
        var currentPage = dataTable.page();
        dataTable.clear();
        dataTable.rows.add(gridData);
        dataTable.draw();
        dataTable.page(currentPage).draw(false);
    },

    /**
     * 데이터 테이블의 부가 기능 화면 css 를 재조정한다.
     * @param gridPanelId
     */
    modifyDataTablesStyle: function (gridPanelId) {
        var dataTable = $('#' + gridPanelId + '_wrapper');
        $(dataTable.find('.dataTables_filter')).parent().removeClass('col-sm-6');
        $(dataTable.find('.dataTables_filter')).parent().addClass('col-sm-12');
        $(dataTable.find('.dataTables_paginate')).parent().removeClass('col-sm-7');
        $(dataTable.find('.dataTables_paginate')).parent().addClass('col-sm-12');
        $(dataTable.find('.dataTables_paginate')).css('text-align', 'center');
    },

    /**
     * 그리드 테이블을 생성한다.
     */
    renderGrid: function (gridData) {
        var me = this;
        var panel = me.panel;
        var panelId = panel.attr('id');
        me.gridData = gridData;
        var greedOptions = {
            columns: [],
            searching: true,
            pageLength: 25,
            info: true
        };
        if (gridData) {
            greedOptions.data = gridData;
        }
        for (var key in me.gridOptions) {
            greedOptions[key] = me.gridOptions[key];
        }

        var dt;
        if (!panel.data('table')) {
            panel.data('table', true);
            me.dt = panel.DataTable(greedOptions);
            me.modifyDataTablesStyle(panelId);
            $(".dataTables_paginate").find('a').css("font-size", "11px");
        }

        if(!greedOptions.ajax){
            var renderGridAction = function (gridData) {
                // page event
                panel.unbind('draw.dt');
                panel.on('draw.dt', function () {
                    panel.find('tbody').find('td').each(function () {
                        var td = $(this);
                        var index = me.dt.cell(this).index();
                        if (index) {
                            var rowIdx = index.row;
                            var columnIdx = index.column;
                            var column = greedOptions.columns[columnIdx];
                            if (column['event']) {
                                for (var eventKey in column['event']) {
                                    me.bindTdEvent(rowIdx, columnIdx, td, eventKey, column);
                                }
                            }
                        }
                    });
                });

                var dataTable = panel.dataTable().api();
                dataTable.clear();
                dataTable.rows.add(gridData);
                dataTable.draw();
                panel.on('draw.dt', function () {
                    $(".dataTables_paginate").find('a').css("font-size", "11px");
                });
            };
            renderGridAction(gridData);
        }else{
            panel.unbind('draw.dt');
            panel.on('draw.dt', function () {
                panel.find('tbody').find('td').each(function () {
                    var td = $(this);
                    var index = me.dt.cell(this).index();
                    if (index) {
                        var rowIdx = index.row;
                        var columnIdx = index.column;
                        var column = greedOptions.columns[columnIdx];
                        if (column['event']) {
                            for (var eventKey in column['event']) {
                                me.bindTdEvent(rowIdx, columnIdx, td, eventKey, column);
                            }
                        }
                    }
                });
            });
            panel.on('draw.dt', function () {
                $(".dataTables_paginate").find('a').css("font-size", "11px");
            });
        }
    },
    bindTdEvent: function (rowIdx, columnIdx, td, eventKey, column) {
        var me = this;
        var callback = column['event'][eventKey];
        var key = column['data'];
        var value = me.gridData[rowIdx][key];
        var rowValue = me.gridData[rowIdx];
        td.unbind(eventKey);
        td.bind(eventKey, function () {
            callback(key, value, JSON.parse(JSON.stringify(rowValue)), rowIdx, td);
        })
    }
}
;
uengineDT.prototype.constructor = uengineDT;