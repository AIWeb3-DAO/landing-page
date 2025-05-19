// app/xlova/page.tsx
import Form from "../../components/xlova/Form";
import MessageList from "../../components/xlova/MessageList";
import styles from "../../components/xlova/styles.module.css";
import { NavbarDemo } from "@/components/TopNavbar";
import LovaBegin from "../../components/xlova/LovaBegin";

export default function XlovaPage() {
  return (
    <div className={styles.container}>
      <NavbarDemo />

      <LovaBegin />
      <Form />
      <MessageList />

    </div>
  );
}
