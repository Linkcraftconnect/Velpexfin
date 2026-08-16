import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'w-full rounded-xl bg-purple-800 border border-purple-800 px-4 py-3 text-white placeholder:text-purple-200 shadow-sm transition duration-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none ' +
                className
            }
            ref={localRef}
        />
    );
});