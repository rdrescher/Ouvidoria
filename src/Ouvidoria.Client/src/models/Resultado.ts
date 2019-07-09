type Nullable<T = Object> = T|null|undefined;

export default interface IResultado<T = unknown>
{
    data: Nullable<T>;
    success: boolean;
    messages: string[];
}
