const MAX_SIZE = 50;
class LRUCache {
  maxSize: number;
  cache: Map<number | string, any>;
  constructor(maxSize: number) {
    this.maxSize = maxSize || MAX_SIZE;
    this.cache = new Map();
  }
  get(key: number) {
    if (this.cache.has(key)) {
      const temp = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, temp);
      return temp;
    }
    return null;
  }

  set(key: number | string, value: any) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);
    if (this.cache.size > this.maxSize) {
      this.cache.delete(this.cache.keys().next().value!);
    }
  }
  delete(key: number | string) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
  }
  clear() {
    this.cache.clear();
  }
}
export default LRUCache;
