# MiBand Heart-late Electron Client for NeosVR

neosrec:///G-BinaryComputing/R-e63c5bb9-531f-4931-85ee-7d1accaac6b3

## ダウンロード
リリースから最新版のzipをダウンロードして、`MiBandHRElectron.exe`を実行してください

## 使い方
1. GetTokenを押して、Miアカウントでログインしてください。
2. Miトークンが出てくるので、そのままConnectを押してください。
3. ちょっとまつと心拍数が出ます

## Feature
MiBandのトークンをクライアント内で取得して、リアルタイムの心拍数をWebSocketで配信します。

## 適当な仕様書
`ws://localhost:8080`でストリームします。

## 知っている問題
- エラーを処理していません。問題が発生したら、再起動してください。
