---
name: commit
description: 按照项目 commitlint 规范分析变更并生成符合约定式提交格式的 git commit，自动选择类型和 emoji。
metadata:
  author: 欧阳天
  version: "1.0.0"
---

# 代码提交技能

基于项目 `commitlint.config.cjs` 中定义的规范，自动分析变更内容并生成符合约定式提交（Conventional Commits）格式的提交信息。

## 提交类型与 Emoji 对照表

| 类型       | Emoji | 说明               | 适用场景                           |
|------------|-------|--------------------|------------------------------------|
| feat       | ✨    | 新增功能           | 新功能、新特性                     |
| fix        | 🐛    | 修复缺陷           | Bug 修复                           |
| docs       | 📝    | 文档变更           | README、注释等文档修改             |
| style      | 💄    | 代码格式           | 格式化、空格、分号等，不影响逻辑   |
| refactor   | 🔨    | 代码重构           | 既不是新功能也不是 bug 修复的重构  |
| perf       | ⚡️    | 性能优化           | 提升性能的代码改动                 |
| test       | ✅    | 测试               | 添加或修改测试用例                 |
| build      | 📦️    | 打包构建           | 构建系统或外部依赖的变更           |
| ci         | 👷    | CI 配置变更        | CI/CD 配置文件和脚本的变更         |
| revert     | ⏪️    | 代码回退           | 回退之前的提交                     |
| chore      | 🚀    | 构建/工程依赖/工具 | 不修改 src 或 test 的其他变更      |
| wip        | 🚧    | 正在开发中         | 尚未完成的开发中代码               |
| workflow   | 🎯    | 工作流程改进       | 开发工作流相关的改进               |

## 提交信息格式

```
{type}: {emoji} {subject}
```

**规则：**
- `type` 必须是上表中的类型之一
- `emoji` 必须与类型对应
- `subject` 不能为空，简明描述本次变更内容（中文优先）
- 标题总长度不超过 108 个字符
- 不需要 scope（已在配置中跳过）
- 不需要 body 和 footer（已在配置中跳过）

## 执行步骤

1. 获取当前 git 状态和变更内容
2. 分析变更，智能判断最合适的提交类型
3. 生成简洁的中文描述（subject）
4. 暂存所有变更文件（`git add -A`，但跳过 .env 等敏感文件）
5. 执行 `git commit -m "type: emoji subject"`
6. 执行 `git pull --rebase` 拉取远程最新代码（rebase 方式保持提交历史整洁）
7. 执行 `git push` 推送到远程仓库

## 上下文信息

- 当前 git 状态：!`git status`
- 暂存和未暂存的变更：!`git diff HEAD`
- 当前分支：!`git branch --show-current`
- 最近 5 条提交（参考风格）：!`git log --oneline -5`

## 任务

根据以上变更内容，完成以下操作：

1. **分析变更**：理解本次改动的核心目的，判断属于哪种提交类型
2. **生成提交信息**：按照 `{type}: {emoji} {subject}` 格式构造提交信息
3. **暂存文件**：使用 `git add` 暂存相关文件（避免暂存 .env、secrets 等敏感文件）
4. **执行提交**：使用 `git commit -m` 提交，**不要使用 `--no-verify`**
5. **拉取最新代码**：执行 `git pull --rebase`，将远程最新提交同步到本地，若有冲突需先解决后再继续
6. **推送代码**：执行 `git push`，将本次提交推送到远程仓库

如果用户在调用时提供了参数（如 `$ARGUMENTS`），将其作为 subject 的补充说明或提交类型的提示。

$ARGUMENTS
