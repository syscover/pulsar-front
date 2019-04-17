declare interface Array<T>
{
    random(): any;
}
Array.prototype.random = function (): number
{
    return this[Math.floor(Math.random() * this.length)];
};
