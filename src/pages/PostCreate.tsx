import { usePostForm } from "@/hooks/usePostForm";
import PostFormHeader from "@/components/posts/PostFormHeader";
import PostFormFields from "@/components/posts/PostFormFields";
import PostTagInput from "@/components/posts/PostTagInput";
import PostFormAlerts from "@/components/posts/PostFormAlerts";
import PostFormActions from "@/components/posts/PostFormActions";

export default function PostCreate() {
  const {
    title,
    body,
    category,
    tagInput,
    tags,
    loading,
    error,
    setTitle,
    setBody,
    setCategory,
    setTagInput,
    handleAddTag,
    handleRemoveTag,
    handleTagKeyPress,
    handleSubmit,
    handleCancel,
  } = usePostForm({ mode: "create" });

  return (
    <div className="min-h-screen bg-gray-50">
      <PostFormHeader title="게시글 작성" onBack={handleCancel} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <PostFormFields
              title={title}
              body={body}
              category={category}
              onTitleChange={setTitle}
              onBodyChange={setBody}
              onCategoryChange={setCategory}
            />

            <PostTagInput
              tagInput={tagInput}
              tags={tags}
              onTagInputChange={setTagInput}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
              onKeyPress={handleTagKeyPress}
            />

            <PostFormAlerts error={error} />

            <PostFormActions
              loading={loading}
              submitText="작성하기"
              onCancel={handleCancel}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
