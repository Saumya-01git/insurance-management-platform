import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";

const CustomerFormModal = ({ isOpen, onClose, onSubmit, initialData = null, isLoading = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (initialData) {
      let formattedDob = "";
      if (initialData.dob) {
        formattedDob = new Date(initialData.dob).toISOString().split("T")[0];
      }
      reset({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        address: initialData.address || "",
        dob: formattedDob,
      });
    } else {
      reset({
        name: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
      });
    }
  }, [initialData, reset, isOpen]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Customer Record" : "Register New Customer"}
      subtitle={initialData ? "Update existing customer profile details" : "Add a new customer to the carrier platform"}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <Input
          label="Full Name *"
          icon={User}
          placeholder="e.g. Sarah Jenkins"
          error={errors.name?.message}
          {...register("name", { required: "Full name is required" })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email Address *"
            type="email"
            icon={Mail}
            placeholder="sarah@example.com"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
          />

          <Input
            label="Phone Number *"
            type="tel"
            icon={Phone}
            placeholder="+1 (555) 019-2834"
            error={errors.phone?.message}
            {...register("phone", { required: "Phone number is required" })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Date of Birth *"
            type="date"
            icon={Calendar}
            error={errors.dob?.message}
            {...register("dob", { required: "Date of birth is required" })}
          />

          <Input
            label="Home / Billing Address *"
            icon={MapPin}
            placeholder="123 Financial District, Suite 400"
            error={errors.address?.message}
            {...register("address", { required: "Address is required" })}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
          <Button variant="secondary" size="md" onClick={onClose} isDisabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit" isLoading={isLoading}>
            {initialData ? "Save Changes" : "Register Customer"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CustomerFormModal;
