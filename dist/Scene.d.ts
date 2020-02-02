/// <reference types="react" />
interface SceneProps {
    viewport?: 'auto' | ['auto' | number, 'auto' | number];
    resolution?: 'flex' | [number, number];
    useDocumentCSS?: boolean;
    children: any;
}
export declare function Scene(props: SceneProps): JSX.Element;
export {};
