import * as React from 'react'
import { Classes, getClassColor, getImgUrl } from '../domain/classes';


interface props {
    classname: string,
    onClick?: () => void,
    hideBorder?: boolean
}
class ClassBadge extends React.Component<props, {}>{

    render() {
        var color = getClassColor(this.props.classname)
        return (
            <div style={{
                backgroundColor: color.backgroundColor
            }} onClick={() => this.props.onClick && this.props.onClick()} className={this.props.hideBorder ? "classBadge-noborder" : "classBadge"}>
                <img src={getImgUrl(this.props.classname)} />
                <span style={{ color: color.textColor }}>{this.props.classname}</span>
            </div>
        )
    }
}

export default ClassBadge