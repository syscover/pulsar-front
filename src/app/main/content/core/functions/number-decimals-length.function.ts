declare interface Number {
    decimalsLength(this: number): number;
}
Number.prototype.decimalsLength = function() 
{
    const match = ('' + this).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (! match) { return 0; }
    return Math.max(0,
       // Number of digits right of decimal point.
       (match[1] ? match[1].length : 0)
       // Adjust for scientific notation.
       - (match[2] ? +match[2] : 0)
    );
};
