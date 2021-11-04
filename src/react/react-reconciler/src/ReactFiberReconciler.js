import {enableNewReconciler} from 'shared/ReactFeatureFlags';

import {
  getPublicRootInstance as getPublicRootInstance_old,
} from './ReactFiberReconciler.old';

import {
  getPublicRootInstance as getPublicRootInstance_new,
} from './ReactFiberReconciler.new';

export const getPublicRootInstance = enableNewReconciler
  ? getPublicRootInstance_new
  : getPublicRootInstance_old;