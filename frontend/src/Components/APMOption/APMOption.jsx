import { APMOptionData } from "../../utils/DataProvider";
import "./APMOption.scss";

export const APMOption = () => {
    return (
        <div className="apm__content">
            {APMOptionData.map(option => (
                <div className="apm__link" key={option.code}>
                <p className="apm__title">{option.title}</p>
                <div className="apm__image">
                <img src={option.glass} alt="" className="apm__glass" />
                </div>
            </div>
            ))}
            
            <div className="apm__emptyblock"></div>
        </div>
    )
}
