import React from "react";

const MarketSection = ({
    title,
    data,
    renderItem,
    titleClassName = '',
    containerClassName = '',
    contentClassName = '',
    showTitle = true,
    renderTitle,
    renderContent,
})  => {
        const defaultTitleRender = () => (
            <div className={titleClassName}>
                {title}
            </div>
        );
        
        const defaultContentRender = () => (
            <div className={containerClassName}>
                {data.map((item, index) => renderItem(item, index))}
            </div>
        );

        return (
            <div className={contentClassName}>
                {showTitle && (renderTitle ? renderTitle(title) : defaultTitleRender())}
                {renderContent ? renderContent(data) : defaultContentRender()}
            </div>
        )
    }


export default MarketSection;