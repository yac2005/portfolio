import { useEffect } from "react";

const content = {
  fr: {
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : 29 août 2026",
    sections: [
      { h: "Résumé", p: "YADEV.DZ vend des produits numériques (clés et licences). Nous collectons uniquement les données que vous nous fournissez volontairement lors d'une demande d'information ou d'une commande." },
      { h: "Données collectées", p: "Lors d'une demande ou commande via e-mail, WhatsApp ou formulaire : nom, e-mail, numéro WhatsApp/téléphone, détails de la commande et messages échangés. Aucune donnée bancaire n'est stockée sur ce site." },
      { h: "Finalité", p: "Traiter vos demandes, livrer vos clés/licences, assurer le support, prévenir la fraude et respecter nos obligations légales." },
      { h: "Base légale", p: "Exécution du contrat (votre commande) et consentement pour les demandes d'information." },
      { h: "Conservation", p: "Données de commande conservées jusqu'à 3 ans pour le support et la comptabilité, puis supprimées. Messages de simple inquiry supprimés après 12 mois sur demande." },
      { h: "Partage", p: "Aucune vente de données. Partage uniquement avec prestataires nécessaires : hébergement (Vercel), fournisseur d'e-mail, et WhatsApp/Meta si vous nous contactez par ce canal, ainsi que les éditeurs des licences livrées." },
      { h: "Paiement", p: "Les paiements sont traités par des prestataires externes. Nous ne conservons pas vos numéros de carte." },
      { h: "Cookies", p: "Pas de cookies publicitaires. Seuls cookies techniques d'hébergement et de sécurité peuvent s'appliquer." },
      { h: "Vos droits", p: "Accès, rectification, suppression et opposition : contactez yacineabanou88@gmail.com. Livraison de produits numériques = pas de rétractation après envoi de la clé sauf clé défectueuse (remplacement/remboursement)." },
      { h: "Contact", p: "YADEV.DZ — yacineabanou88@gmail.com" },
    ],
  },
  ar: {
    title: "سياسة الخصوصية",
    updated: "آخر تحديث: 29 أغسطس 2026",
    sections: [
      { h: "ملخص", p: "YADEV.DZ يبيع منتجات رقمية (مفاتيح وتراخيص). نجمع فقط البيانات التي تقدمها طوعاً عند الاستفسار أو الطلب." },
      { h: "البيانات المجمّعة", p: "عند الطلب عبر البريد أو واتساب أو النموذج: الاسم، البريد، رقم واتساب/الهاتف، تفاصيل الطلب والرسائل. لا نخزن بيانات بنكية على هذا الموقع." },
      { h: "الغرض", p: "معالجة طلباتكم، تسليم المفاتيح/التراخيص، تقديم الدعم، منع الاحتيال والالتزام القانوني." },
      { h: "الأساس القانوني", p: "تنفيذ العقد (طلبك) والموافقة للاستفسارات." },
      { h: "الاحتفاظ", p: "بيانات الطلبات حتى 3 سنوات للدعم والمحاسبة ثم الحذف. رسائل الاستفسار البسيطة تحذف بعد 12 شهراً عند الطلب." },
      { h: "المشاركة", p: "لا نبيع البيانات. نشاركها فقط مع مزودي الخدمة الضروريين: الاستضافة (Vercel)، مزود البريد، واتساب/Meta إذا تواصلت عبره، وناشري التراخيص." },
      { h: "الدفع", p: "المدفوعات عبر مزودين خارجيين. لا نحتفظ بأرقام البطاقات." },
      { h: "ملفات الارتباط", p: "لا ملفات إعلانية، فقط تقنية للأمان والاستضافة." },
      { h: "حقوقك", p: "الوصول والتصحيح والحذف والاعتراض عبر yacineabanou88@gmail.com. المنتج الرقمي لا يُسترد بعد إرسال المفتاح إلا إذا كان معيباً (استبدال/استرجاع)." },
      { h: "التواصل", p: "YADEV.DZ — yacineabanou88@gmail.com" },
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "Last updated: Aug 29, 2026",
    sections: [
      { h: "Summary", p: "YADEV.DZ sells digital products (keys & licenses). We only collect data you voluntarily provide when you inquire or place an order." },
      { h: "Data collected", p: "When you inquire/order via email, WhatsApp or form: name, email, WhatsApp/phone, order details and messages. No payment card data is stored on this site." },
      { h: "Purpose", p: "To process inquiries, deliver keys/licenses, provide support, prevent fraud and meet legal obligations." },
      { h: "Legal basis", p: "Contract performance (your order) and consent for inquiries." },
      { h: "Retention", p: "Order data kept up to 3 years for support/accounting then deleted. Simple inquiry messages deleted after 12 months on request." },
      { h: "Sharing", p: "No data selling. Shared only with necessary providers: hosting (Vercel), email provider, WhatsApp/Meta if you contact us there, and license publishers for delivery." },
      { h: "Payments", p: "Payments are handled by external providers. We do not store card numbers." },
      { h: "Cookies", p: "No ad cookies. Only technical/hosting and security cookies may apply." },
      { h: "Your rights", p: "Access, correct, delete or object via yacineabanou88@gmail.com. Digital delivery = no withdrawal after key is sent unless defective (replacement/refund)." },
      { h: "Contact", p: "YADEV.DZ — yacineabanou88@gmail.com" },
    ],
  },
} as const;

type Lang = keyof typeof content;

export default function Privacy({ lang = "fr" as Lang }: { lang?: Lang }) {
  const t = content[lang] ?? content.fr;
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-16 pt-28">
        <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← {lang === "ar" ? "العودة" : lang === "fr" ? "Retour" : "Back"}</a>
        <h1 className="text-3xl font-bold mt-6">{t.title}</h1>
        <p className="text-sm text-muted-foreground mt-2">{t.updated}</p>
        <div className="mt-10 space-y-8">
          {t.sections.map(s => (
            <section key={s.h}>
              <h2 className="font-semibold text-lg">{s.h}</h2>
              <p className="text-muted-foreground leading-relaxed mt-1.5">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
