import { JSX } from "react";
import { THEME, useTheme } from "./context/ThemeProvider";
import clsx from "clsx";

export default function ThemeContent(): JSX.Element {
    const { theme, toggleTheme } = useTheme();

    const isLightMode = theme === THEME.LIGHT;

    return (
        <div
            className={clsx('p-4 h-dvh w-full', isLightMode ? 'bg-white' : 'bg-gray-800')}
        >
            <h1 className={clsx('text-wxl font-bold', isLightMode ? 'text-black' : 'text-white')}>Theme Content</h1>
            <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in mollis neque. Etiam vitae efficitur metus. Cras pretium massa eu neque aliquam, ac tempus libero accumsan. Cras scelerisque finibus augue a pretium. Integer at justo urna. Quisque vel turpis vitae ipsum pellentesque molestie. Etiam maximus facilisis lorem, eu eleifend eros aliquet ac. Cras consequat lectus a quam vestibulum fringilla. Nam ac vulputate lacus. Sed eget sapien urna. Cras fermentum est elit, vitae blandit mauris convallis et. Praesent sit amet sodales sem, ac consectetur tortor. Fusce enim erat, laoreet eu dui sit amet, pulvinar sodales elit. Duis convallis fermentum nibh, vitae pharetra lacus venenatis eget.
            </p>
        </div>
    );
}