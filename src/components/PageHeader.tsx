import { FC } from "react";
import Button from "./Button";
import { PageHeaderAction, PageHeaderType } from "../types";

const PageHeader: FC<PageHeaderType> = (props) => {
    const { isActionButton, heading } = props;

    if (isActionButton) {
        const {
            children,
            loading,
            arrow,
            disabled,
            type,
            path,
            classNames,
            handler,
        } = props as PageHeaderAction;

        return (
            <>
                <div className="w-full h-auto inline-flex justify-between px-2">
                    <div className="self-start">
                        <h1 className="text-2xl font-bold">{heading}</h1>
                    </div>
                    <div className="self-end">
                            <Button
                            type={type as any}
                            path={path}
                            loading={loading}
                            arrow={arrow}
                            classNames={classNames}
                            handler={handler}
                            disabled={disabled}
                        >
                            {children}
                        </Button>
                    </div>
                </div>
                <div className="divider divider-vertical my-0"></div>
            </>
        );
    }

    return (
        <>
            <div className="w-full h-auto inline-flex justify-between px-2">
                <div className="self-start">
                    <h1 className="text-2xl font-bold">{heading}</h1>
                </div>
                <div className="self-end">
                </div>
            </div>
            <div className="divider divider-vertical"></div>
        </>
    );
};

export default PageHeader;
