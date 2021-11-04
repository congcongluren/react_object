import {
    getPublicRootInstance,
} from 'react-reconciler/src/ReactFiberReconciler';

function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {

    let root = container._reactRootContainer;
    let fiberRoot;
    if (!root) {
    } else {
        fiberRoot = root;
        if (typeof callback === 'function') {
            const originalCallback = callback;
            callback = function () {
                const instance = getPublicRootInstance(fiberRoot);
                originalCallback.call(instance);
            };
        }
        // Update
        updateContainer(children, fiberRoot, parentComponent, callback);
    }
    return getPublicRootInstance(fiberRoot);
}


export function render(element, container, callback,) {
    return legacyRenderSubtreeIntoContainer(
        null,
        element,
        container,
        false,
        callback,
    );
}