import * as React from 'react'
const ReactHighcharts = require('react-highcharts');

interface props{
    title: string,
    data: IPiechartdata[]
}

interface IPiechartdata {
    name: string,
    y: number
}

class PieChart extends React.Component<props, {}>{
    getConfig(){
        var cfg:any = {
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
        }

        return cfg;
    }
    render(){
        if(!this.props.data) return null;
        return <ReactHighcharts config={this.getConfig()}></ReactHighcharts>
    }
}

export default PieChart