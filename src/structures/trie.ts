type Node = {
  [key: string]: Trie | undefined;
};

export default class Trie {
  val: string | undefined;
  children: Node;
  isWord: boolean;

  constructor(val?: string) {
    this.val = val;
    this.children = {};
    this.isWord = false;
  }

  insert(word: string) {
    let curr: Trie = this;

    for (const char of word) {
      curr.children[char] = curr.children[char] || new Trie(char);
      curr = curr.children[char]!;
    }

    curr.isWord = true;
  }

  remove(word: string) {
    let curr: Trie = this;
    const stack = [curr];

    for (const char of word) {
      const child = curr.children[char];
      if (!child) return false;
      curr = child;
      stack.push(curr);
    }

    let child = stack.pop();
    if (child) child.isWord = false;

    while (stack.length) {
      const parent = stack.pop();
      if (
        child?.val &&
        !child.isWord &&
        Object.keys(child.children).length === 0
      )
        delete parent?.children[child.val];

      child = parent;
    }

    return true;
  }

  searchNode(word: string) {
    let curr: Trie = this;

    for (const char of word) {
      const child = curr.children[char];
      if (!child) return false;
      curr = child;
    }

    return curr;
  }

  search(word: string, partial?: boolean) {
    const curr = this.searchNode(word);
    if (!curr) return false;

    return partial ? true : curr.isWord;
  }

  startsWith(prefix: string) {
    return this.search(prefix, true);
  }

  *getAllWords(prefix = "", node: Trie = this): IterableIterator<string> {
    if (!node) return;

    if (node.isWord) yield prefix;

    for (const char of Object.keys(node.children))
      yield* this.getAllWords(`${prefix}${char}`, node.children[char]);
  }

  *autocomplete(prefix = ""): IterableIterator<string> {
    const curr = this.searchNode(prefix);
    if (curr) yield* this.getAllWords(prefix, curr);
  }
}
