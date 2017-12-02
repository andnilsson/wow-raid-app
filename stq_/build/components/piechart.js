"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactHighcharts = require('react-highcharts');
class PieChart extends React.Component {
    getConfig() {
        var cfg = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: this.props.title
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    }
                }
            },
            series: [{
                    name: this.props.title,
                    colorByPoint: true,
                    data: this.props.data
                }]
        };
        return cfg;
    }
    render() {
        if (!this.props.data)
            return null;
        return React.createElement(ReactHighcharts, { config: this.getConfig() });
    }
}
exports.default = PieChart;
//# sourceMappingURL=piechart.js.map