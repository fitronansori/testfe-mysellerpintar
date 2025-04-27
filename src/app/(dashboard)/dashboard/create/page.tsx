import DasboardHeader from "@/components/layouts/AppSidebar/DashboardHeader";
import DashboardCreateForm from "@/components/layouts/dashboard/DashboardCreateForm";
import DashboardCard from "@/components/layouts/DashboardCard";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const CreateArticle = () => {
  return (
    <section>
      <DasboardHeader pageName="Articles" />

      <div className="p-6">
        <DashboardCard className="pb-6">
          <CardHeader className="p-6">
            <CardTitle className="font-medium flex items-center gap-2">
              <Link href={"/dashboard"}>
                <ArrowLeft className="size-5" />
              </Link>

              <p>Create Articles</p>
            </CardTitle>
          </CardHeader>

          <CardContent className="px-6">
            <DashboardCreateForm />
          </CardContent>
        </DashboardCard>
      </div>
    </section>
  );
};
export default CreateArticle;
