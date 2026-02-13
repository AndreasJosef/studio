export type NodeType = 'element' | 'text';

export interface BaseNode {
  type: NodeType;
}

export interface TextNode extends BaseNode {
  type: 'text';
  value: string;
}

export interface ElementNode extends BaseNode {
  type: 'element';
  tagName: string;
  attributes: Record<string, string>;
  children: HTMLTreeNode[];
}

export type HTMLTreeNode = ElementNode | TextNode;

/**
 * Converts an HTML string into a serializable object tree.
 * Designed for use in logic hooks to prepare data for React rendering.
 *
 * @param the html formatted string to be parsed
 * @returns an array of @HTMlTreeNodes
 */
export const parseHTMLToTree = (htmlString: string): HTMLTreeNode[] => {
  // 1. Create a parser instance (Standard Browser API)
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const nodeToJSON = (node: Node): HTMLTreeNode | null => {
    // Handle Text Nodes (nodeType 3)
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      return text ? { type: 'text', value: text } : null;
    }

    // Handle Element Nodes (nodeType 1)
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const tagName = element.tagName.toLowerCase();

      // Security: Block list for dangerous tags
      const forbiddenTags = [
        'script',
        'iframe',
        'style',
        'object',
        'embed',
        'br',
      ];
      if (forbiddenTags.includes(tagName)) return null;

      // Extract and filter attributes
      const attributes: Record<string, string> = {};
      Array.from(element.attributes).forEach((attr) => {
        // Prevent inline JS handlers (onmouseover, onclick, etc.)
        if (!attr.name.toLowerCase().startsWith('on')) {
          attributes[attr.name] = attr.value;
        }
      });

      return {
        type: 'element',
        tagName,
        attributes,
        children: Array.from(element.childNodes)
          .map(nodeToJSON)
          .filter((child): child is HTMLTreeNode => child !== null),
      };
    }

    return null;
  };

  // We parse the children of the body tag to get the actual content
  const initialTree = Array.from(doc.body.childNodes)
    .map(nodeToJSON)
    .filter((node): node is HTMLTreeNode => node !== null);

  return promoteLineBreaks(initialTree);
};

/**
 * Promotes plain text with line breaks into paragraph elements
 */
const promoteLineBreaks = (nodes: HTMLTreeNode[]): HTMLTreeNode[] => {
  // Scenario: Only one node, and it's a text node containing line breaks
  if (nodes.length === 1 && nodes[0].type === 'text' && nodes[0].value) {
    const text = nodes[0].value;

    // Split by one or more newline characters
    return text
      .split(/\n+/)
      .map((part) => part.trim())
      .filter((part) => part.length > 0)
      .map((part) => ({
        type: 'element',
        tagName: 'p',
        attributes: {},
        children: [{ type: 'text', value: part }],
      }));
  }

  return nodes;
};
