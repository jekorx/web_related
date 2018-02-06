/*
 * 分页工具（必须在<ul class="pagination"></ul>中）
 * pageNum：当前第几页
 * pageSize：每页多少条
 * allCount：总条数
 * calbak：回调函数，点击页面跳转，加载新数据的方法
 */
//全局变量，每页分10条
var _$defaultPageSize = 10;
jQuery.fn.pagination = function(pageNum, pageSize, allCount, calbak) {
    pageNum = parseInt(pageNum);
    pageSize = parseInt(pageSize);
    allCount = parseInt(allCount);
    var $pager = $(this).empty(),
        totalPage = Math.ceil(allCount / pageSize),
        firstEnable = pageNum != 1,
        prevEnable = pageNum - 1 > 0,
        nextEnable = totalPage - pageNum > 0,
        lastEnable = pageNum != totalPage,
        pages = '',
        showNum = 7,
        i,
        halfPage = (showNum - 3) / 2;

    pages += '<li class="' + (firstEnable ? '' : 'disabled') + '">' +
        '<a href="javascript:void(0)" data-page="1"><span>&laquo;</span></a>' +
        '</li>' +
        '<li class="' + (prevEnable ? '' : 'disabled') + '">' +
        '<a href="javascript:void(0)" data-page="' + (+pageNum - 1) + '"><span>&lsaquo;</span></a>' +
        '</li>';

    if (totalPage <= showNum) {
        for (i = 1; i <= totalPage; i++) {
            pages += '<li class="' + (i == pageNum ? 'active' : '') + '"><a href="javascript:void(0)" data-page="' + i + '">' + i + '</a></li>';
        }
    } else {
        if ((pageNum - halfPage) > 1) {
            pages += '<li class=""><a href="javascript:void(0)" data-page="1">1</a></li>';
            if (pageNum - halfPage > 2) {
                pages += '<li class="disabled"><a href="javascript:void(0)">···</a></li>';
            }
            if (totalPage - (pageNum + halfPage) > 0) {
                for (i = pageNum - halfPage; i <= pageNum + halfPage; i++) {
                    pages += '<li class="' + (i == pageNum ? 'active' : '') + '"><a href="javascript:void(0)" data-page="' + i + '">' + i + '</a></li>';
                }
                if (totalPage - pageNum - halfPage > 1) {
                    pages += '<li class="disabled"><a href="javascript:void(0)">···</a></li>';
                }
                pages += '<li class=""><a href="javascript:void(0)" data-page="' + totalPage + '" >' + totalPage + '</a></li>';
            } else {
                for (i = totalPage - showNum + 2; i <= totalPage; i++) {
                    pages += '<li class="' + (i == pageNum ? 'active' : '') + '"><a href="javascript:void(0)" data-page="' + i + '">' + i + '</a></li>';
                }
            }
        } else {
            for (i = 1; i <= (totalPage > showNum ? showNum - 1 : showNum); i++) {
                pages += '<li class="' + (i == pageNum ? 'active' : '') + '"><a href="javascript:void(0)" data-page="' + i + '">' + i + '</a></li>';
            }
            if (totalPage - pageNum - halfPage > 2) {
                pages += '<li class="disabled"><a href="javascript:void(0)">···</a></li>';
            }
            pages += '<li class=""><a href="javascript:void(0)" data-page="' + totalPage + '">' + totalPage + '</a></li>';
        }
    }

    pages += '<li class="' + (nextEnable ? '' : 'disabled') + '">' +
        '<a href="javascript:void(0)" data-page="' + (+pageNum + 1) + '"><span>&rsaquo;</span></a>' +
        '</li>' +
        '<li class="' + (lastEnable ? '' : 'disabled') + '">' +
        '<a href="javascript:void(0)" data-page="' + totalPage + '"><span>&raquo;</span></a>' +
        '</li>';

    pages += '<li style="padding-left:10px;font-size:14px">第' +
        '<input type="text" class="form-control" value="' + pageNum + '" style="' +
            'display:inline-block;width:40px;padding:6px;margin:0 5px;text-align:center">页' +
            '<button class="btn btn-default" data-num="' + pageNum + '" style="padding:6px 8px;margin:-3px 0 0 10px">跳转</button>' +
        '</li>';

    pages += '<li style="padding-left:10px;font-size:14px">每页' + 
        '<select style="padding:5px;border-color:#CCC;border-radius:4px;margin:0 5px">' +
            '<option value="10">10</option>' +
            '<option value="20">20</option>' +
            '<option value="50">50</option>' +
        '</select>' +
        '条</li>';
    pages += '<li style="padding-left:10px;font-size:14px">( 共' + totalPage + '页 / ' + allCount + '条 )</li>';

    $pager.append(pages);

    $pager.find('>li select').val(pageSize);
    $pager.off('change', '>li select').on('change', '>li select', function() {
        pageSize = $(this).val();
        calbak(1, pageSize);
    });

    $pager.off('input', '>li input').on('input', '>li input', function() {
        var inputNum = $.trim($(this).val());
        if (!/^[1-9]{1}[0-9]*$/.test(inputNum)) {
            inputNum = inputNum.substring(0, inputNum.length - 1);
        }
        if (inputNum.length > 0) {
            inputNum = parseInt(inputNum);
        } else {
            inputNum = '';
        }
        if (inputNum > totalPage) {
            inputNum = totalPage;
        }
        $(this).val(inputNum)
            .siblings('button').attr('data-num', inputNum);
    });
    $pager.off('click', '>li button').on('click', '>li button', function() {
        if ($(this).attr('data-num') != pageNum) {
            calbak($(this).attr('data-num'), pageSize);
        }
    });
    $pager.off('click', '>li >a').on('click', '>li >a', function() {
        var item = $(this).parent(),
            clickNum = $(this).attr('data-page');
        if (!item.hasClass('disabled') && !item.hasClass('active')) {
            $pager.find('>li input').val(clickNum);
            $pager.find('>li button').attr('data-num', clickNum);
            calbak(clickNum, pageSize);
        }
    });

    return $pager;
};