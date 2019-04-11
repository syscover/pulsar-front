declare interface Array<T> {
    mapOrder(property: string, arrayPattern: Array<T>): Array<T>;
}
Array.prototype.mapOrder = function(property: string, arrayPattern: Array<any>) 
{
    const arr = Object.assign([], this);

    arr.sort( function (a, b)
    {
        const A = a[property], B = b[property];
        
        if (arrayPattern.indexOf(A) > arrayPattern.indexOf(B)) 
        {
          return 1;
        } 
        else 
        {
          return -1;
        } 
    });
      
    return arr;
};
