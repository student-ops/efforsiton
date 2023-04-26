const Description: React.FC = () => {
    const defaultLink = "text-blue-600 underline"
    return (
        <>
            <div className="my-10">
                <h1 className="text-3xl pb-3 font-bold">
                    Welcome to
                    <span className="text-indigo-600"> Efforisition</span>
                </h1>
                <div>
                    <div className="my-10">
                        <p>Efforsitionは開発者向けAIタスク管理ツールです。</p>
                        <p>
                            コードの更新から、実装された機能を推測しタスクの達成を判定することが目的です。
                        </p>
                    </div>

                    <div className="ml-5 my-10">
                        <ul>
                            <li>
                                <div className="flex flex-row">
                                    <div className="w-1/3">Github : </div>
                                    <a
                                        href="https://github.com/student-ops/efforsiton"
                                        className={defaultLink}>
                                        https://github.com/student-ops/efforsiton
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div className="flex flex-row">
                                    <div className="w-1/3">Web app root: </div>
                                    <a
                                        href="https://app.croud-crab.com"
                                        className={defaultLink}>
                                        https://app.croud-crab.com
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div className="flex flex-row">
                                    <div className="w-1/3">Author website:</div>
                                    <a
                                        href="https://www.croud-crab.com"
                                        className={defaultLink}>
                                        https://www.croud-crab.com
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="my-10">
                        <h3 className="font-bold">デモ</h3>
                        <p>準備中...</p>
                    </div>
                    <p className="my-5 font-bold">処理のイメージ</p>
                    <img
                        src="efforsition_descriptione.jpg"
                        alt="service_image"
                    />
                    <div>
                        <p>
                            &nbsp; ログインしている github
                            アカウントのGthubリポジトリとアプリ内のプロジェクトを連携させることができます。
                            <br />
                            プロジェクトとGthubリポジトリがリンクされると、APIを使用してwebhook
                            を作成します。 <br />
                            ①リンクしたGthubリポジトリにコードのがpushされると、pushイベントがサーバに送信されます。
                            <br />
                            ②,③
                            サーバにイベントが送信されると、イベント情報をもとにPromptを作成し、
                            chatgpt apiに送信します。
                            <a
                                href="https://github.com/student-ops/efforsiton/blob/3133fe9b2df66498ff9c891ff02cfb415355d078/src/lib/gptapi.ts#L74-L111"
                                className={defaultLink}>
                                Github:ソースコード該当部分
                            </a>
                            <br />
                            ④chatgpt
                            apiからの応答をもとにタスクの終了を判定します。
                            タスクが達成されたと判断するとそれをユーザに知らせます。
                            <a
                                href="https://github.com/student-ops/efforsiton/blob/c0097a6fc4101bdc7a5703495723bc35c66e7cac/src/pages/api/webhook.ts#L100-L112"
                                className={defaultLink}>
                                Github:ソースコード該当部分
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Description
