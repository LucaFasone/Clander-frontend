function CalendarFooter(renderButtonMemo: JSX.Element | undefined) {
    return (
        <>
            <div className="flex justify-center">
                <span className='text-sm text-slate-500'>Press shift if you want to select a range of days </span>
            </div>
            <div className="">
                <div className="mt-4 flex justify-start w-1/2">
                    {renderButtonMemo}
                </div>
            </div>
        </>
    )
}

export default CalendarFooter