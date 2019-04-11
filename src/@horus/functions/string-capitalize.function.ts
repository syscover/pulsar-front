declare interface String {
    capitalize(this: string): string;
}
String.prototype.capitalize = function(this: string) {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
