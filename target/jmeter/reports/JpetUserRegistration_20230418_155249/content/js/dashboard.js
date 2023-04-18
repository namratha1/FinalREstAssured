/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8932461873638344, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.7142857142857143, 500, 1500, "/actions/Account.action-111"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "/actions/Account.action;jsessionid=DB214B0BB74BFD72B29CB3683A750FA1-81-0"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "/actions/Account.action-85-0"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "/actions/Account.action-85"], "isController": false}, {"data": [1.0, 500, 1500, "/actions/Account.action-111-1"], "isController": false}, {"data": [1.0, 500, 1500, "/actions/Catalog.action-112-0"], "isController": false}, {"data": [0.0, 500, 1500, "01_Launch"], "isController": true}, {"data": [0.5, 500, 1500, "04_SaveAccountInformation"], "isController": true}, {"data": [0.0, 500, 1500, "/actions/Catalog.action-57"], "isController": false}, {"data": [1.0, 500, 1500, "/actions/Catalog.action-57-12"], "isController": false}, {"data": [1.0, 500, 1500, "/actions/Catalog.action-57-11"], "isController": false}, {"data": [1.0, 500, 1500, "/actions/Catalog.action-57-10"], "isController": false}, {"data": [1.0, 500, 1500, "/actions/Catalog.action-57-15"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "02_ClickOnSignIn"], "isController": true}, {"data": [0.96875, 500, 1500, "/actions/Catalog.action-57-14"], "isController": false}, {"data": [1.0, 500, 1500, "/actions/Catalog.action-57-13"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "03_ClickOnRegisterNow"], "isController": true}, {"data": [1.0, 500, 1500, "/actions/Account.action-111-0"], "isController": false}, {"data": [0.8125, 500, 1500, "/actions/Catalog.action-57-0"], "isController": false}, {"data": [1.0, 500, 1500, "/actions/Catalog.action-57-1"], "isController": false}, {"data": [1.0, 500, 1500, "/actions/Catalog.action-57-2"], "isController": false}, {"data": [1.0, 500, 1500, "/actions/Catalog.action-57-3"], "isController": false}, {"data": [1.0, 500, 1500, "/actions/Catalog.action-57-4"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "/actions/Account.action;jsessionid=DB214B0BB74BFD72B29CB3683A750FA1-81"], "isController": false}, {"data": [1.0, 500, 1500, "/actions/Catalog.action-57-5"], "isController": false}, {"data": [1.0, 500, 1500, "/actions/Catalog.action-57-6"], "isController": false}, {"data": [1.0, 500, 1500, "/actions/Catalog.action-112"], "isController": false}, {"data": [1.0, 500, 1500, "/actions/Catalog.action-57-7"], "isController": false}, {"data": [1.0, 500, 1500, "/actions/Catalog.action-57-8"], "isController": false}, {"data": [1.0, 500, 1500, "/actions/Catalog.action-57-9"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 400, 0, 0.0, 457.3225, 207, 8087, 225.0, 467.0, 738.2999999999996, 4215.9000000000015, 12.108369910700773, 72.483079026033, 11.388962464053279], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/actions/Account.action-111", 14, 0, 0.0, 536.0714285714284, 432, 740, 504.0, 705.5, 740.0, 740.0, 0.6584207308470112, 3.1802235691106615, 1.4280785578234492], "isController": false}, {"data": ["/actions/Account.action;jsessionid=DB214B0BB74BFD72B29CB3683A750FA1-81-0", 15, 0, 0.0, 343.99999999999994, 219, 706, 302.0, 571.6000000000001, 706.0, 706.0, 0.6990399850871469, 2.6277258918585145, 0.4464571779755802], "isController": false}, {"data": ["/actions/Account.action-85-0", 15, 0, 0.0, 304.6666666666667, 223, 649, 238.0, 539.8000000000001, 649.0, 649.0, 0.7005417522884364, 3.9763041752288437, 0.45836227932934803], "isController": false}, {"data": ["/actions/Account.action-85", 15, 0, 0.0, 304.6666666666667, 223, 649, 238.0, 539.8000000000001, 649.0, 649.0, 0.7005417522884364, 3.9763041752288437, 0.45836227932934803], "isController": false}, {"data": ["/actions/Account.action-111-1", 14, 0, 0.0, 257.9285714285714, 218, 372, 238.5, 343.5, 372.0, 372.0, 0.6654941293910729, 3.0727111755478442, 0.4562274207348957], "isController": false}, {"data": ["/actions/Catalog.action-112-0", 13, 0, 0.0, 255.07692307692307, 220, 367, 243.0, 336.59999999999997, 367.0, 367.0, 0.6422607578676942, 2.9654383429672446, 0.3851055716120745], "isController": false}, {"data": ["01_Launch", 16, 0, 0.0, 4475.562499999999, 3496, 8087, 3735.5, 8014.2, 8087.0, 8087.0, 0.4824072119878192, 27.9816793612627, 3.9365182259474776], "isController": true}, {"data": ["04_SaveAccountInformation", 13, 0, 0.0, 790.9230769230768, 686, 971, 756.0, 961.8, 971.0, 971.0, 0.6278979907264297, 5.931919103796368, 1.7383699254974883], "isController": true}, {"data": ["/actions/Catalog.action-57", 16, 0, 0.0, 4475.562499999999, 3496, 8087, 3735.5, 8014.2, 8087.0, 8087.0, 0.4843347964280309, 28.093487494324204, 3.9522476161646742], "isController": false}, {"data": ["/actions/Catalog.action-57-12", 16, 0, 0.0, 219.18749999999997, 208, 233, 218.0, 230.2, 233.0, 233.0, 0.6346184356655561, 0.4294829842931937, 0.3259856417578931], "isController": false}, {"data": ["/actions/Catalog.action-57-11", 16, 0, 0.0, 220.00000000000006, 210, 228, 220.5, 227.3, 228.0, 228.0, 0.6344171292624902, 0.46651962727993657, 0.32588223632038066], "isController": false}, {"data": ["/actions/Catalog.action-57-10", 16, 0, 0.0, 219.43750000000003, 209, 228, 218.5, 228.0, 228.0, 228.0, 0.6341154090044389, 0.44833941027266966, 0.32572725110970197], "isController": false}, {"data": ["/actions/Catalog.action-57-15", 16, 0, 0.0, 335.81249999999994, 222, 499, 364.5, 427.6000000000001, 499.0, 499.0, 0.6318616223047153, 22.45206737224548, 0.32271838717320905], "isController": false}, {"data": ["02_ClickOnSignIn", 15, 0, 0.0, 343.99999999999994, 219, 706, 302.0, 571.6000000000001, 706.0, 706.0, 0.6990399850871469, 2.6277258918585145, 0.4464571779755802], "isController": true}, {"data": ["/actions/Catalog.action-57-14", 16, 0, 0.0, 236.18749999999997, 210, 511, 217.0, 312.9000000000002, 511.0, 511.0, 0.6351222610352493, 0.4696353877222928, 0.3268646792632582], "isController": false}, {"data": ["/actions/Catalog.action-57-13", 16, 0, 0.0, 219.5, 209, 229, 219.0, 227.6, 229.0, 229.0, 0.6348954406571168, 0.5922306530494822, 0.32860799174635924], "isController": false}, {"data": ["03_ClickOnRegisterNow", 15, 0, 0.0, 304.6666666666667, 223, 649, 238.0, 539.8000000000001, 649.0, 649.0, 0.7005090365665717, 3.9761184794283846, 0.4583408735347686], "isController": true}, {"data": ["/actions/Account.action-111-0", 14, 0, 0.0, 277.92857142857144, 213, 425, 260.0, 402.5, 425.0, 425.0, 0.6659056316590563, 0.1417650661149163, 0.9878033735254946], "isController": false}, {"data": ["/actions/Catalog.action-57-0", 16, 0, 0.0, 959.9999999999999, 219, 4217, 239.5, 4128.8, 4217.0, 4217.0, 0.5379417005682009, 2.8467832767373835, 0.24953350368153854], "isController": false}, {"data": ["/actions/Catalog.action-57-1", 16, 0, 0.0, 218.9375, 208, 234, 218.0, 231.2, 234.0, 234.0, 0.6238059963351398, 3.634400951304144, 0.31860403914382623], "isController": false}, {"data": ["/actions/Catalog.action-57-2", 16, 0, 0.0, 218.99999999999997, 207, 234, 218.5, 230.5, 234.0, 234.0, 0.6325360743229886, 2.529526586281874, 0.326151413322791], "isController": false}, {"data": ["/actions/Catalog.action-57-3", 16, 0, 0.0, 221.56249999999997, 210, 241, 220.0, 238.2, 241.0, 241.0, 0.6326611308817714, 0.23415875840253064, 0.3218910636615263], "isController": false}, {"data": ["/actions/Catalog.action-57-4", 16, 0, 0.0, 218.99999999999997, 208, 232, 217.5, 231.3, 232.0, 232.0, 0.6329614684706069, 0.2033635968035446, 0.32513450431205004], "isController": false}, {"data": ["/actions/Account.action;jsessionid=DB214B0BB74BFD72B29CB3683A750FA1-81", 15, 0, 0.0, 343.99999999999994, 219, 706, 302.0, 571.6000000000001, 706.0, 706.0, 0.6990399850871469, 2.6277258918585145, 0.4464571779755802], "isController": false}, {"data": ["/actions/Catalog.action-57-5", 16, 0, 0.0, 217.93749999999997, 210, 225, 217.5, 223.6, 225.0, 225.0, 0.6330866933090651, 0.34374629050765637, 0.3239623313417481], "isController": false}, {"data": ["/actions/Catalog.action-57-6", 16, 0, 0.0, 221.375, 210, 228, 223.0, 228.0, 228.0, 228.0, 0.6332370285352437, 0.36547176158625877, 0.3240392606957692], "isController": false}, {"data": ["/actions/Catalog.action-112", 13, 0, 0.0, 255.07692307692307, 220, 367, 243.0, 336.59999999999997, 367.0, 367.0, 0.6422607578676942, 2.9654383429672446, 0.3851055716120745], "isController": false}, {"data": ["/actions/Catalog.action-57-7", 16, 0, 0.0, 219.9375, 209, 232, 219.5, 229.2, 232.0, 232.0, 0.6333874351767547, 0.42246447092355804, 0.3265903962630141], "isController": false}, {"data": ["/actions/Catalog.action-57-8", 16, 0, 0.0, 221.87499999999997, 208, 234, 221.5, 231.2, 234.0, 234.0, 0.6336633663366337, 0.3551980198019802, 0.32425742574257427], "isController": false}, {"data": ["/actions/Catalog.action-57-9", 16, 0, 0.0, 219.06249999999997, 207, 228, 218.0, 228.0, 228.0, 228.0, 0.6339395380165617, 0.33182772693054396, 0.3250178295495067], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 400, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
