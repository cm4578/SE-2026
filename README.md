# SE-2026

Python Django 全端，選型與原因見 Wiki 的[技術棧決策](https://github.com/cm4578/SE-2026/wiki/技術棧決策)。

## 本機啟動

需要先安裝 [uv](https://docs.astral.sh/uv/getting-started/installation/)。電腦上沒有 Python 3.13 時，uv 會自動下載。

```powershell
uv sync
uv run python manage.py migrate
uv run python manage.py runserver
```

啟動後打開 http://127.0.0.1:8000/ ，可以看到 Django 預設的歡迎頁。

- `uv sync` 依 `pyproject.toml` 與 `uv.lock` 建立 `.venv/` 並安裝套件。
- `migrate` 會在專案根目錄產生本機資料庫 `db.sqlite3`，這個檔案不進 repo。
- `SECRET_KEY` 優先讀取環境變數 `DJANGO_SECRET_KEY`，沒有設定時使用開發用金鑰，只能在本機開發使用。

## UML 設計圖

[UML 詳細圖索引](docs/uml/README.md)收錄八張完整版，依結構圖與行為圖分類，提供 SVG、PNG 與 PlantUML 原始檔。
