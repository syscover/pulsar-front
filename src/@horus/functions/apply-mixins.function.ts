// multiple inheritance example, Chipable class from src/app/main/core/traits/chipable.trait.ts
// applyMixins(ArticleDetailComponent, [Chipable]);

export const applyMixins = (derivedCtor: any, baseCtors: any[]) => {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
};
