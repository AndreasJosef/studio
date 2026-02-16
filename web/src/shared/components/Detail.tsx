import { HTMLTreeNode } from '../../core/html-parse';
import React from 'react';

interface DetailProps {
  nodes: HTMLTreeNode[];
}

/**
 * Recursivley renders the the content of the nodes in an HTMLNodeTree
 *
 * @param { nodes }
 **/
export function Detail({ nodes }: DetailProps) {
  return (
    <>
      {nodes.map((node, index) => {
        if (node.type === 'text') {
          return (
            <React.Fragment key={`text-${index}`}>{node.value}</React.Fragment>
          );
        }

        if (node.type === 'element' && node.tagName) {
          const Tag = node.tagName as keyof React.JSX.IntrinsicElements;

          const { class: className, ...restAttributes } = node.attributes || {};

          return (
            <Tag
              key={`${node.tagName}-${index}`}
              className={className}
              {...restAttributes}
            >
              {/* Recursive call */}
              {node.children && node.children.length > 0 && (
                <Detail nodes={node.children} />
              )}
            </Tag>
          );
        }

        return null;
      })}
    </>
  );
}
