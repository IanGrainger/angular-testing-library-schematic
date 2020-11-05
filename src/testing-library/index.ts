import { normalize, strings } from '@angular-devkit/core';
import {
  Rule,
  SchematicContext,
  Tree,
  url,
  template,
  apply,
  mergeWith,
  move,
  Source,
  forEach,
} from '@angular-devkit/schematics';
import { Schema } from './schema';

export function testingLibrary(_options: Schema): Rule {
  return (_: Tree, _context: SchematicContext) => {
    const sourceTemplates = url('./files');

    return applyWithOverwrite(sourceTemplates, [
      template({ ..._options, ...strings }),
      move(normalize(_options.path as string)),
    ]);
  };
}

// https://stackoverflow.com/a/53230034
function applyWithOverwrite(source: Source, rules: Rule[]): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const rule = mergeWith(
      apply(source, [
        ...rules,
        forEach((fileEntry) => {
          if (tree.exists(fileEntry.path)) {
            tree.overwrite(fileEntry.path, fileEntry.content);
            return null;
          }
          return fileEntry;
        }),
      ])
    );

    return rule(tree, _context);
  };
}
/*
example: https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2

import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  externalSchematic,
} from '@angular-devkit/schematics';

const licenseText = `
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 * /
`;

export function testingLibraryComponent(options: any): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'component', options),
    (tree: Tree, _context: SchematicContext) => {
      tree.getDir(options.sourceDir).visit((filePath) => {
        if (!filePath.endsWith('.ts')) {
          return;
        }
        const content = tree.read(filePath);
        if (!content) {
          return;
        }

        // Prevent from writing license to files that already have one.
        if (content.indexOf(licenseText) == -1) {
          tree.overwrite(filePath, licenseText + content);
        }
      });
      return tree;
    },
  ]);
}
*/
