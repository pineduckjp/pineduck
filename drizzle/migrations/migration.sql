-- お問い合わせ内容を保存するテーブル
CREATE TABLE contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    user_id TEXT,
    user_name TEXT,
    app TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    sent_to_admin INTEGER DEFAULT 0 -- 0:未送信, 1:送信済み
);

-- Android MVP リクエストを保存するテーブル
CREATE TABLE android_mvp_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    sent_to_admin INTEGER DEFAULT 0 -- 0:未送信, 1:送信済み
);