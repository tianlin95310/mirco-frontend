interface HumenInfo {
  name: string
}

class Humen {
  kind: string
}
class Men extends Humen{
  am: HumenInfo;
  hello: void
}

// 将ts文件翻译成js文件以及.d.ts文件
// tsc index.ts --watch -d