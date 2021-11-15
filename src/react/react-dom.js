
import { createFiberRoot } from './ReactFiberRoot';
import { updateContainer } from './ReactFiberReconciler';
function render(element, container) {
    let fiberRoot = createFiberRoot(container);
    updateContainer(element, fiberRoot);
}
const ReactDom = {
    render
}
export default ReactDom;