import * as React from 'react'
import { Classes, getClassColor, getImgUrl } from '../domain/classes';


interface props {
    classname: string,
    onClick?: () => void,
    hideBorder?: boolean
}
class ClassBadge extends React.Component<props, {}>{   

    render() {
        return (
            <div onClick={() => this.props.onClick && this.props.onClick()} className={this.props.hideBorder ? "classBadge-noborder" : "classBadge"}>
                <img src={getImgUrl(this.props.classname)} />
                <span style={{color: getClassColor(this.props.classname)}}>{this.props.classname}</span>
            </div>
        )
    }
}

export default ClassBadge