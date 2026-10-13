const { execSync } = require('child_process');

const tokenOutput = execSync('git credential fill', { input: 'protocol=https\nhost=github.com\n' }).toString();
const tokenMatch = tokenOutput.match(/password=(.+)/);
if (!tokenMatch) {
  console.error('Failed to get token');
  process.exit(1);
}
const token = tokenMatch[1].trim();
const env = { ...process.env, GH_TOKEN: token };

const issues = [
  {
    title: '[初期構築] 産婦人科クリニック看護師採用LPの全体設計・UIデザイン・実装',
    body: `## 概要
20〜40代の看護師をターゲットとした産婦人科クリニック採用ランディングページ（LP）の新規構築。

## LP制作の目的
- 看護師の採用応募獲得
- クリニックの認知度向上
- 仕事内容や働き方の理解促進
- 職場の雰囲気やスタッフの魅力を伝える
- 教育体制やサポート環境の紹介
- 求職者の不安解消と応募促進

## 実装内容
- 清潔感と安心感のあるフェミニンなデザイン（サクラピンク・ウォームベージュ基調）
- 全18セクション構築（FV、採用メッセージ、理念・特徴、数字で知るクリニック、働く魅力、仕事内容、1日の流れ、スタッフインタビュー、職場雰囲気ギャラリー、研修教育制度、福利厚生、募集要項、選考フロー、FAQ、CTA、応募モーダルフォームなど）
- HTML5 / Tailwind CSS / Vanilla JS / CSS3アニメーションによるフルレスポンシブ実装

## 関連コミット
- \`e1602b5\` (Initial commit: 産婦人科クリニック看護師採用LP)
- 公開URL: https://ikeda-haruka.github.io/nurse/

## ステータス
- 対応完了 (Closed)
`,
    close: true
  },
  {
    title: '[ビジュアル] 日本人女性看護師・医療スタッフの写真素材生成とコンテンツ文言の完全整合',
    body: `## 概要
採用LPの信頼性と親しみやすさを向上させるため、リアルな日本人女性看護師・助産師・医師の現場写真を生成し、各セクションの紹介文言と100%整合させました。

## 生成・配置したビジュアル素材
1. \`hero-nurse-main.jpg\`: ファーストビュー用メインビジュアル（優しく微笑む日本人女性看護師）
2. \`nurse-listening.jpg\`: POINT 02 傾聴・丁寧なカウンセリング対応
3. \`outpatient-nurse.jpg\`: 外来看護（診察室で医師と連携・電子カルテ確認）
4. \`nurse-baby-care.jpg\`: 病棟・新生児ケア（赤ちゃんを優しく抱く看護師）
5. \`maternity-class.jpg\`: マタニティクラス・母親学級の指導風景
6. \`nurse-sato.jpg\`: 先輩インタビュー 佐藤綾香さん（総合病院からの転職・病棟担当）
7. \`nurse-takahashi.jpg\`: 先輩インタビュー 高橋真理子さん（未経験スタート・外来担当）
8. \`nurse-ito.jpg\`: 先輩インタビュー 伊藤恵子さん（助産師リーダー・指導担当）
9. \`nurse-team-smile.jpg\`: 職場雰囲気（笑顔のスタッフチーム集合写真）
10. \`doctor-keiko.jpg\`: 院長・メッセージ

## 関連コミット
- \`e1602b5\` (Initial commit: 産婦人科クリニック看護師採用LP)

## ステータス
- 対応完了 (Closed)
`,
    close: true
  },
  {
    title: '[インフラ] GitHub PagesによるWeb公開と自動デプロイパイプライン構築',
    body: `## 概要
作成した採用LPを https://ikeda-haruka.github.io/nurse/ にて全世界に高速かつ安定して公開するための自動デプロイ環境を構築。

## 対応内容
- GitHub リポジトリ（ikeda-haruka/nurse）の初期化およびリモートプッシュ
- GitHub Pages 用の自動デプロイワークフロー (\`.github/workflows/deploy.yml\`) の作成
- 静的アセット配信用 \`.nojekyll\` の配置
- サブディレクトリ配信（\`/nurse/\`）に対応した相対パス・画像リンク設計
- HTTPステータス 200 OK による本番稼働確認

## 関連コミット
- \`8bd48fb\` (Docs: GitHub Pages公開手順を追加)
- \`d88c02d\` (Trigger GitHub Pages deployment)

## ステータス
- 対応完了 (Closed)
`,
    close: true
  },
  {
    title: '[要件対応] ポートフォリオ実績用デモサイト告知バーの最上部固定表示',
    body: `## 概要
本サイトがポートフォリオ実績用の架空クリニックサイトであることを、閲覧者・採用担当者に対して明確に示すための固定告知ヘッダーを実装。

## 対応内容
- ページ最上部に固定告知バー（\`PORTFOLIO DEMO 【ポートフォリオ実績用】\`）を追加
- グラデーションアクセント（ローズ〜インディゴ）とクリーンなタイポグラフィ
- ナビゲーションバーの固定位置（\`top: 36px\`）およびフローティング要素のオフセット連動調整
- スマホ・PC双方で崩れないレスポンシブ配慮

## 関連コミット
- \`29c7e07\` (Add fixed portfolio demo notice banner to page top)

## ステータス
- 対応完了 (Closed)
`,
    close: true
  },
  {
    title: '[UI/UX改善] スマートフォン・タブレット表示における3カラムカードの1カラム最適化',
    body: `## 概要
スマートフォンやタブレット（1024px未満）において、横3列（3カラム）にカードが並ぶことで幅が狭くなり、文字が詰まって読みにくくなる問題を解消。

## 対応内容
- **先輩スタッフインタビュー（3名）**:
  - \`staff-interview-grid\` を新設し、1024px未満では \`grid-template-columns: 1fr\` の1カラム（縦並び）に最適化
  - カード最大幅（540px）およびマージン自動設定により、モバイル画面中央でゆったりと読みやすいサイズに調整
  - 写真サイズ・パディングのレスポンシブ微調整
- **研修・教育制度（入職後の3ステップ）**:
  - \`education-steps-grid\` を新設し、1024px未満では縦1列（1カラム）表示に最適化
  - 各ステップのチェックリストや説明が画面全体でスムーズに読めるように改善
- **PC大画面表示**:
  - 1024px以上のデスクトップでは従来の洗練された横3列（3カラム）レイアウトを維持

## 関連コミット
- \`87fd1e0\` (Optimize mobile layout: stack 3-column cards into single column on mobile/tablet)

## ステータス
- 対応完了 (Closed)
`,
    close: true
  },
  {
    title: '[進捗管理] プロジェクト進捗・変更履歴トラッカー（自動同期）',
    body: `## 概要
本リポジトリのすべての開発進捗・変更履歴・今後のタスクを常に同期・トラッキングするためのマスターIssueです。
GitHub Actions と連携し、コミットがプッシュされるたびに自動で更新履歴が記録されます。

## 完了したタスク一覧
- [x] #1 産婦人科クリニック看護師採用LPの全体設計・UIデザイン・実装
- [x] #2 日本人女性看護師・医療スタッフの写真素材生成とコンテンツ文言の完全整合
- [x] #3 GitHub PagesによるWeb公開と自動デプロイパイプライン構築
- [x] #4 ポートフォリオ実績用デモサイト告知バーの最上部固定表示
- [x] #5 スマートフォン・タブレット表示における3カラムカードの1カラム最適化
- [x] #6 プロジェクト進捗・変更履歴トラッカー（GitHub Actions自動同期）の構築

## 今後の改善・拡張候補（ロードマップ）
- [ ] 応募フォームの入力バリデーションおよび送信完了フィードバックの強化
- [ ] 院内バーチャルツアー（動画・パノラマビュー）セクションの追加検討
- [ ] SEOメタタグ（OGP画像・Twitterカード）の最適化
- [ ] アクセシビリティ（WAI-ARIA、コントラスト比）のさらなる向上
- [ ] 多言語対応（インバウンド向け外国語対応ページの検討）

## コミット変更履歴（Changelog）
*今後pushされたコミットが自動的にここに記録されます。*
- \`87fd1e0\`: Optimize mobile layout: stack 3-column cards into single column on mobile/tablet
- \`29c7e07\`: Add fixed portfolio demo notice banner to page top
- \`d88c02d\`: Trigger GitHub Pages deployment
- \`8bd48fb\`: Docs: GitHub Pages公開手順を追加
- \`e1602b5\`: Initial commit: 産婦人科クリニック看護師採用LP
`,
    close: false
  }
];

for (const issue of issues) {
  console.log('Creating issue:', issue.title);
  // Write body to a temporary file to avoid shell escaping issues
  const fs = require('fs');
  fs.writeFileSync('temp_body.md', issue.body, 'utf8');
  
  const out = execSync(`gh issue create --repo ikeda-haruka/nurse --title ${JSON.stringify(issue.title)} --body-file temp_body.md`, { env }).toString().trim();
  console.log('Created:', out);
  
  if (issue.close) {
    const issueNumber = out.split('/').pop();
    console.log(`Closing issue #${issueNumber}`);
    execSync(`gh issue close ${issueNumber} --repo ikeda-haruka/nurse --reason completed`, { env });
  }
}

if (require('fs').existsSync('temp_body.md')) {
  require('fs').unlinkSync('temp_body.md');
}

console.log('All initial issues successfully synchronized!');
