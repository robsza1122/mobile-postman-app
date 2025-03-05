import './MyParcelOption.scss';

export const MyParcelOption = (option) => {
    const {header, title, amount} = option.option;
        console.log(option.option.header);
  return (
    <div className="parceloption__content">
        <h1 className="parceloption__header">{header}</h1>
        <p className="parceloption__amount">{amount}</p>
        <p className="parceloption__title">{title}</p>
        
    </div>
  );
};
