import { chain, noop, Rule } from '@angular-devkit/schematics';
import {
  addDepsToPackageJson,
  addPackageWithInit,
  setDefaultCollection,
} from '@nrwl/workspace';

import { packageName } from '../../utils/consts';
import { Schema } from './schema';

const updateDependencies = addDepsToPackageJson(
  {
    '@nuxt/typescript-runtime': '^2.0.0',
    'core-js': '^3.6.5',
    nuxt: '^2.14.6',
  },
  {
    '@nuxt/babel-preset-app': '^2.14.7',
    '@nuxt/typescript-build': '^2.0.3',
    'fork-ts-checker-webpack-plugin': '^6.0.4', // Fix for yarn see https://github.com/nuxt/typescript/issues/145#issuecomment-703000886
  }
);

export default function (schema: Schema): Rule {
  return chain([
    setDefaultCollection(packageName),
    schema.e2eTestRunner === 'cypress'
      ? addPackageWithInit('@nrwl/cypress')
      : noop(),
    updateDependencies,
  ]);
}
