import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { create } from "zustand";

const useFormStore = create((set) => ({
  data: {},
  updateField: (field, value) => set((state) => ({
    data: { ...state.data, [field]: value },
  })),
  reset: () => set({ data: {} })
}));

export default function MobileFriendlyOrderForm() {
  const { data, updateField, reset } = useFormStore();
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    updateField(e.target.name, e.target.value);
  };

  const handleCopy = () => {
    const fields = [
      "name", "kana", "birth", "gender", "tel", "email", "line", "shoulder", "bust", "waist", "hip"
    ];
    const values = fields.map((field) => data[field] || "").join("\t");
    navigator.clipboard.writeText(values).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold text-center">スマホ対応・簡易入力フォーム</h2>
          <div className="space-y-3">
            <div>
              <Label>氏名</Label>
              <Input name="name" value={data.name || ""} onChange={handleChange} placeholder="例: 山田 太郎" />
            </div>
            <div>
              <Label>フリガナ</Label>
              <Input name="kana" value={data.kana || ""} onChange={handleChange} placeholder="ヤマダ タロウ" />
            </div>
            <div>
              <Label>生年月日</Label>
              <Input type="date" name="birth" value={data.birth || ""} onChange={handleChange} />
            </div>
            <div>
              <Label>性別</Label>
              <Input name="gender" value={data.gender || ""} onChange={handleChange} placeholder="男性／女性" />
            </div>
            <div>
              <Label>電話番号</Label>
              <Input name="tel" value={data.tel || ""} onChange={handleChange} placeholder="090-xxxx-xxxx" />
            </div>
            <div>
              <Label>メールアドレス</Label>
              <Input name="email" value={data.email || ""} onChange={handleChange} placeholder="sample@example.com" />
            </div>
            <div>
              <Label>LINE ID</Label>
              <Input name="line" value={data.line || ""} onChange={handleChange} placeholder="@lineid" />
            </div>
          </div>
          <Separator />
          <div className="space-y-3">
            <div>
              <Label>肩幅</Label>
              <Input name="shoulder" value={data.shoulder || ""} onChange={handleChange} placeholder="cm" />
            </div>
            <div>
              <Label>バスト</Label>
              <Input name="bust" value={data.bust || ""} onChange={handleChange} placeholder="cm" />
            </div>
            <div>
              <Label>ウエスト</Label>
              <Input name="waist" value={data.waist || ""} onChange={handleChange} placeholder="cm" />
            </div>
            <div>
              <Label>ヒップ</Label>
              <Input name="hip" value={data.hip || ""} onChange={handleChange} placeholder="cm" />
            </div>
          </div>
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={reset}>リセット</Button>
            <Button onClick={handleCopy}>{copied ? "コピーしました！" : "コピー"}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
