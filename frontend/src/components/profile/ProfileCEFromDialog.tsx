import React, { useEffect, useMemo } from "react";
import Grid from "@mui/material/Grid";
import { DialogProps } from "@mui/material/Dialog";
import { useForm } from "react-hook-form";
import { Trans } from "react-i18next";
import { InputFieldUC } from "../shared/fields/InputField";
import { SelectFieldUC } from "../shared/fields/SelectField";
import { styles } from "../../config/styles";
import { useServiceContext } from "../../providers/ServiceProvider";
import setServerFieldErrors from "../../utils/setServerFieldError";
import useConnectSelectField from "../../utils/useConnectSelectField";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import { ICustomError } from "../../utils/CustomError";
import { Link, useNavigate, useParams } from "react-router-dom";
import toastError from "../../utils/toastError";
import { CEDialog, CEDialogActions } from "../shared/dialogs/CEDialog";
import FormProviderWithForm from "../shared/FormProviderWithForm";
import AutocompleteAsyncField, {
  useConnectAutocompleteField,
} from "../shared/fields/AutocompleteAsyncField";
import UploadField from "../shared/fields/UploadField";

interface IProfileCEFromDialogProps extends DialogProps {
  onClose: () => void;
  onSubmitForm: () => void;
  openDialog?: any;
  context?: any;
}

const ProfileCEFromDialog = (props: IProfileCEFromDialogProps) => {
  const [loading, setLoading] = React.useState(false);
  const { service } = useServiceContext();
  const {
    onClose: closeDialog,
    onSubmitForm,
    context = {},
    openDialog,
    ...rest
  } = props;
  const { type, data = {} } = context;
  const { expertGroupId: fallbackExpertGroupId } = useParams();
  const { id, expertGroupId = fallbackExpertGroupId } = data;
  const defaultValues = type === "update" ? data : {};
  const formMethods = useForm({ shouldUnregister: true });
  const abortController = useMemo(() => new AbortController(), [rest.open]);
  const navigate = useNavigate();
  const close = () => {
    abortController.abort();
    closeDialog();
  };

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  const onSubmit = async (data: any, event: any, shouldView?: boolean) => {
    event.preventDefault();
    const { dsl_id, tags = [], ...restOfData } = data;
    const formattedData = {
      dsl_id: dsl_id.id,
      tag_ids: tags.map((t: any) => t.id),
      expert_group_id: expertGroupId,
      ...restOfData,
    };
    setLoading(true);
    try {
      const { data: res } =
        type === "update"
          ? await service.updateProfile(
              { data: formattedData, id },
              { signal: abortController.signal }
            )
          : await service.createProfile(
              { data: formattedData },
              { signal: abortController.signal }
            );
      setLoading(false);
      onSubmitForm();
      close();
      shouldView && res?.id && navigate(`${res.id}`);
    } catch (e) {
      const err = e as ICustomError;
      setLoading(false);
      setServerFieldErrors(err, formMethods);
      toastError(err);
    }
  };

  return (
    <CEDialog
      {...rest}
      closeDialog={close}
      title={
        <>
          <NoteAddRoundedIcon sx={{ mr: 1 }} />
          {type === "update" ? (
            <Trans i18nKey="updateProfile" />
          ) : (
            <Trans i18nKey="createProfile" />
          )}
        </>
      }
    >
      <FormProviderWithForm formMethods={formMethods}>
        <Grid container spacing={2} sx={styles.formGrid}>
          <Grid item xs={12}>
            <UploadField
              accept={{ "application/zip": [".zip"] }}
              uploadService={(args, config) =>
                service.uploadProfileDSL(args, config)
              }
              deleteService={(args, config) =>
                service.deleteProfileDSL(args, config)
              }
              name="dsl_id"
              required={true}
              label={<Trans i18nKey="dsl" />}
            />
          </Grid>
          <Grid item xs={12}>
            <AutocompleteAsyncField
              {...useConnectAutocompleteField({
                service: (args, config) =>
                  service.fetchProfileTags(args, config),
              })}
              name="tags"
              multiple={true}
              searchOnType={false}
              label={<Trans i18nKey="tags" />}
            />
          </Grid>
        </Grid>
        <CEDialogActions
          closeDialog={close}
          loading={loading}
          type={type}
          hasViewBtn={true}
          onSubmit={(...args) =>
            formMethods.handleSubmit((data) => onSubmit(data, ...args))
          }
        />
      </FormProviderWithForm>
    </CEDialog>
  );
};

export default ProfileCEFromDialog;
