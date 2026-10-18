// ─── Instructor Notes ─────────────────────────────────────────────────────
// Each key maps to a lesson id (e.g. "l11") and contains:
//   time        — suggested wall-clock time for live session
//   difficulty  — 1-5 star rating for students
//   commonErrors — pitfalls students reliably hit
//   talkingPoints — key points to emphasise verbally (not in slides)
//   exercises   — suggested in-class exercises or discussion prompts
//   skipIfShort — what to cut if running low on time

window.INSTRUCTOR_NOTES = {

  l11: {
    time: "90 min",
    difficulty: 2,
    commonErrors: [
      "Confusing matrix multiplication order (AB ≠ BA) — always check shapes first",
      "Thinking vectors need to be 'arrows' in 2D/3D — emphasise they are just ordered numbers",
      "Broadcasting rules: students add wrong-shaped tensors silently without errors in numpy",
    ],
    talkingPoints: [
      "The entire neural network forward pass is ONE matrix multiply: Z = XW + b",
      "Eigendecomposition is how PCA works — connect early so it feels like payoff later",
      "Cosine similarity == dot product of unit vectors — this is why embeddings use it",
    ],
    exercises: [
      "Implement matmul from scratch with nested loops, then show np.dot speed difference",
      "Given two 512-D embedding vectors, compute cosine similarity by hand then verify with numpy",
      "Show students that a 3-layer linear network always collapses to 1 layer (matrix multiply chain)",
    ],
    skipIfShort: "SVD section — return to it before Module 4 (attention uses it conceptually)",
  },

  l12: {
    time: "75 min",
    difficulty: 3,
    commonErrors: [
      "Forgetting the chain rule when functions are composed — draw the graph first",
      "Confusing partial derivative ∂ with total derivative d",
      "Thinking gradient points 'downhill' — it points UP the steepest ascent; we negate it",
    ],
    talkingPoints: [
      "The gradient is the single most important concept in all of ML — spend extra time here",
      "Numerical gradient check: (f(x+ε) - f(x-ε)) / 2ε — every ML engineer should know this",
      "Jacobian is just 'gradient generalised to vector outputs' — don't overcomplicate it",
    ],
    exercises: [
      "Derive ∂/∂w of MSE loss manually, then verify numerically with the ε trick",
      "Trace the chain rule through a 2-layer network on the whiteboard step by step",
    ],
    skipIfShort: "Jacobian section — not needed until Module 2 advanced backprop",
  },

  l13: {
    time: "80 min",
    difficulty: 3,
    commonErrors: [
      "Thinking MLE 'assumes the data is true' — it finds parameters most consistent with the data",
      "Confusing P(A|B) and P(B|A) — the base rate fallacy catches even experienced engineers",
      "Not understanding why -log P is the loss: because maximising P = minimising -log P",
    ],
    talkingPoints: [
      "Every loss function is secretly MLE under some distributional assumption — preview this now",
      "Bayes theorem is used in spam filters, medical testing, and RLHF reward models",
      "The CLT is why we can trust mini-batch gradient estimates — crucial intuition",
    ],
    exercises: [
      "Medical test: 1% prevalence, 95% sensitivity, 95% specificity. If test positive, P(disease)?",
      "Fit a Gaussian to student heights using MLE — show it's just mean and std",
    ],
    skipIfShort: "Conjugate priors — interesting but not needed for the rest of the course",
  },

  l14: {
    time: "60 min",
    difficulty: 4,
    commonErrors: [
      "Thinking entropy is about 'randomness' — it's about average surprise / bits needed",
      "Confusing KL(P||Q) direction — not symmetric, matters hugely in VAEs and RLHF",
      "Thinking cross-entropy loss and KL divergence are different — they differ by a constant (H(P))",
    ],
    talkingPoints: [
      "Cross-entropy loss IS minimising KL divergence between model and data distribution",
      "Perplexity = exp(cross-entropy) — lower is better, a perplexity of 10 means '10 equally likely next tokens'",
      "Mutual information underlies why attention works — tokens share information proportional to MI",
    ],
    exercises: [
      "Compute entropy of a fair die (log₂6 bits) vs a loaded die — feel the difference",
      "Show that CE loss and KL divergence give identical gradients (H(data) is constant w.r.t. model)",
    ],
    skipIfShort: "Mutual information derivations — mention the concept, skip the math",
  },

  l21: {
    time: "90 min",
    difficulty: 4,
    commonErrors: [
      "Using BCELoss after sigmoid instead of BCEWithLogitsLoss — causes NaN, always",
      "Applying MSE to classification — won't diverge, but gradients saturate near 0/1",
      "Focal loss gamma=5 is too aggressive — start at 2, tune from there",
    ],
    talkingPoints: [
      "Every loss derives from MLE — knowing the noise assumption tells you when it breaks",
      "The gradient of BCE w.r.t. the logit is literally (ŷ - y) — the cleanest formula in ML",
      "InfoNCE temperature τ is the most underappreciated hyperparameter in contrastive learning",
    ],
    exercises: [
      "Derive MSE from MLE with Gaussian noise assumption — do it on the board together",
      "Show that lowering τ in InfoNCE sharpens the similarity distribution (run the code live)",
      "Label smoothing: what happens to the optimal prediction when ε=0.1? (Answer: 0.9 instead of 1.0)",
    ],
    skipIfShort: "Triplet and InfoNCE sections — cover if students will do any contrastive/embedding work",
  },

  l22: {
    time: "85 min",
    difficulty: 4,
    commonErrors: [
      "Setting β₂=0.999 for LLM training — should be 0.95 for faster adaptation",
      "Not using weight decay with Adam (regular L2) — always use AdamW",
      "Skipping learning rate warmup — causes loss spike at start of transformer training",
    ],
    talkingPoints: [
      "The loss landscape is not a bowl — it is a high-dimensional ravine. This is why we need adaptive optimisers",
      "AdamW is the default for everything now. The only question is: what learning rate?",
      "Cosine annealing + warmup is not optional for transformers — it is required",
    ],
    exercises: [
      "Run the optimizer comparison code live — students see SGD bounce while Adam converges",
      "Break Adam intentionally: set β₂=0.5 and watch training become unstable",
      "Visualise the learning rate schedule: plot warmup_cosine for different warmup percentages",
    ],
    skipIfShort: "RMSprop derivation — just say 'it's Adam without momentum', enough for most",
  },

  l23: {
    time: "100 min",
    difficulty: 5,
    commonErrors: [
      "Forgetting zero_grad() before backward() — gradients accumulate and explode",
      "In-place operations on tensors that require grad — causes cryptic RuntimeError",
      "Using .data instead of .detach() — dangerous, breaks gradient tracking silently",
    ],
    talkingPoints: [
      "The Value class in the code IS PyTorch's autograd engine — just with a simpler graph",
      "Topological sort is the key: you must compute gradients in reverse dependency order",
      "∂L/∂W = Xᵀ·∂L/∂Z is the most important matrix calculus fact in deep learning",
    ],
    exercises: [
      "Implement Value.__mul__ and test against PyTorch — see them match exactly",
      "Add a log operation to the Value class (needed for cross-entropy)",
      "Trace the backprop of a 2-neuron network on paper before running the code",
    ],
    skipIfShort: "Matrix backprop section — reduce to just showing the formulas and trusting PyTorch",
  },

  l24: {
    time: "75 min",
    difficulty: 3,
    commonErrors: [
      "Using dropout at inference without model.eval() — random predictions in production",
      "L1 regularisation gradients are discontinuous at 0 — mention subgradient if students ask",
      "Setting dropout too high (>0.5) in transformers — causes severe underfitting",
    ],
    talkingPoints: [
      "Dropout is an ensemble method at inference — it averages ~2^n different networks",
      "Weight decay (AdamW) is almost always better than L1/L2 regularisation for modern networks",
      "Early stopping is the most underrated regularisation technique — works on everything",
    ],
    exercises: [
      "Show bias-variance decomposition empirically: overfit a polynomial, then regularise",
      "Demonstrate dropout's ensemble effect: 10 forward passes, show variance in outputs",
    ],
    skipIfShort: "L1 sparsity math — mention Lasso connection, skip derivation",
  },

  l31: {
    time: "80 min",
    difficulty: 3,
    commonErrors: [
      "Thinking 'more layers = always better' — depth helps only when the task is hierarchical",
      "Forgetting that GELU ≈ ReLU × sigmoid(1.702x) — just know GELU is the LLM standard",
      "Not understanding that output layer activation depends on the task, not architecture",
    ],
    talkingPoints: [
      "The choice of output activation + loss must match: sigmoid+BCE, softmax+CE, none+MSE",
      "GELU is standard for transformers because it is smooth everywhere (ReLU has kink at 0)",
      "Skip connections (residuals) are not optional for networks > 10 layers — they are required",
    ],
    exercises: [
      "Build a 3-layer MLP from scratch with numpy, train on XOR — 4 points, should converge",
      "Show that a 10-layer linear network = 1-layer linear network (multiply weight matrices)",
    ],
    skipIfShort: "Activation function comparison plots — just show the table, skip code",
  },

  l32: {
    time: "90 min",
    difficulty: 4,
    commonErrors: [
      "Confusing channels and spatial dimensions in conv output shape calculation",
      "Not understanding that depthwise separable convs sacrifice almost nothing in quality",
      "Thinking max pooling is always better than strided convolution — they are interchangeable",
    ],
    talkingPoints: [
      "The receptive field is the single most important design choice in CNN architecture",
      "MobileNet's core insight: depthwise-separable convs are 8-9x cheaper with ~same quality",
      "After GAP (global average pooling), each channel IS a spatial feature detector",
    ],
    exercises: [
      "Implement the Sobel edge-detection filter manually — show it IS a convolution",
      "Compute output shape of a conv layer by hand before checking with torch",
      "Trace the receptive field growth through 5 layers of 3×3 convolutions",
    ],
    skipIfShort: "Depthwise separable conv math — just show the parameter count comparison",
  },

  l33: {
    time: "80 min",
    difficulty: 4,
    commonErrors: [
      "Using Glorot init with ReLU networks — always use He/Kaiming for ReLU",
      "Applying BatchNorm after the activation instead of before (pre-activation) in residual nets",
      "Using BatchNorm with batch size < 8 — use GroupNorm or LayerNorm instead",
    ],
    talkingPoints: [
      "The variance propagation equation is the foundation — derive it on the board",
      "LayerNorm normalises across features, BatchNorm across the batch — this is why LN works in autoregressive models",
      "GPT-2 switched to pre-norm (LN before sublayer) — all modern LLMs use pre-norm",
    ],
    exercises: [
      "Run the 'propagate activation' code — show Glorot vanishes with ReLU, He stays stable",
      "Implement BatchNorm1d forward pass from scratch, verify backward matches PyTorch",
    ],
    skipIfShort: "GPT-2 init section — mention scale-down of residual projections, skip code",
  },

  l34: {
    time: "70 min",
    difficulty: 3,
    commonErrors: [
      "Not calling zero_grad() — single most common bug in all of ML training code",
      "Checking train loss instead of val loss to decide when to stop — always check both",
      "Using model(x) without torch.no_grad() at inference — wastes 40% memory on gradient tracking",
    ],
    talkingPoints: [
      "Overfit on 1 batch first — this is the single most important debugging technique",
      "Gradient clipping (clip_grad_norm_) is not optional for RNNs and is good practice for transformers",
      "Mixed precision (torch.cuda.amp) is free performance: 2× faster, half the memory, same accuracy",
    ],
    exercises: [
      "Deliberately break a training loop in 3 ways (no zero_grad, no backward, wrong loss) — students debug",
      "Add gradient norm logging to the training loop and watch it during a run",
    ],
    skipIfShort: "Mixed precision section — show the 3 lines of code, skip the internals",
  },

  l41: {
    time: "100 min",
    difficulty: 5,
    commonErrors: [
      "Forgetting the causal mask in decoder attention — model cheats by looking at future tokens",
      "Confusing multi-head attention (parallel heads) with multi-query attention (shared K/V) — MQA is for inference efficiency",
      "Thinking Q, K, V are different matrices — they all start from the SAME input x, just with different learned projections",
    ],
    talkingPoints: [
      "Attention is just a differentiable dictionary lookup — query finds the most relevant keys, returns their values",
      "The √dₖ scaling is crucial: without it, softmax saturates to one-hot and gradients vanish",
      "Flash Attention is not a different algorithm — it is the same math, IO-aware. 3× faster, same result",
    ],
    exercises: [
      "Run scaled_dot_product_attention with and without the √dₖ scale — show softmax saturation",
      "Implement causal mask from scratch and verify that token i cannot see token j > i",
      "Compute the number of parameters in a 12-head attention layer with d_model=768",
    ],
    skipIfShort: "Flash Attention and RoPE sections — mention they exist, skip the implementation",
  },

  l42: {
    time: "90 min",
    difficulty: 5,
    commonErrors: [
      "Post-norm vs pre-norm: original paper uses post-norm, but GPT-2+ use pre-norm — always use pre-norm",
      "Not understanding that the FFN is 4× wider than d_model by convention — this ratio matters",
      "Thinking encoder and decoder are the same — decoder adds cross-attention and causal mask",
    ],
    talkingPoints: [
      "The residual stream is the backbone of the transformer — think of it as 'working memory'",
      "KV cache is what makes inference fast — without it, each decode step is O(T²)",
      "Encoder-only (BERT): good for classification. Decoder-only (GPT): good for generation. Encoder-decoder (T5): good for seq2seq",
    ],
    exercises: [
      "Count total parameters in a GPT-2 small (12L, 12H, 768D) transformer — should be ~117M",
      "Build a character-level GPT from scratch using the TransformerBlock implementation",
    ],
    skipIfShort: "Positional encoding math — just show sinusoidal formula and say RoPE is better for long context",
  },

  l43: {
    time: "65 min",
    difficulty: 3,
    commonErrors: [
      "Treating tokenisation as a black box — students need to count tokens manually at least once",
      "Not knowing that 1 token ≈ 4 chars for English but 2-3 chars for code",
      "Confusing word embeddings (static) with contextual embeddings from transformers (dynamic)",
    ],
    talkingPoints: [
      "Tokenisation is the first place where money enters the equation — understanding it cuts API costs",
      "tiktoken (OpenAI) and the Anthropic tokeniser both use BPE — call tokeniser.encode() and count",
      "Embedding tables are the single largest layer in small LLMs — vocab_size × d_model parameters",
    ],
    exercises: [
      "Tokenise 5 sentences and count — which takes the most tokens? (Code is usually dense)",
      "Show how 'tokenisation' splits differently across languages using the BPE code",
    ],
    skipIfShort: "RoPE positional encoding — mention it replaces sinusoidal, skip implementation",
  },

  l44: {
    time: "85 min",
    difficulty: 4,
    commonErrors: [
      "Thinking SFT alone is enough for alignment — base + SFT models still generate harmful content",
      "LoRA r=8 is not always enough — code tasks often need r=64 or higher",
      "Not understanding that DPO is just RLHF without the separate reward model — same objective, different parameterisation",
    ],
    talkingPoints: [
      "Pretraining cost is dropping 40%/year — in 3 years, small teams will pretrain models",
      "LoRA trains 1% of parameters but reaches 90%+ of full fine-tuning quality — understand why (low-rank updates)",
      "Constitutional AI is how Claude is aligned — the model critiques its own outputs before finalising",
    ],
    exercises: [
      "Compute total trainable parameters for LoRA on GPT-2 small with r=8 — compare to full fine-tune",
      "Implement a toy DPO training step: given (prompt, chosen, rejected), compute the DPO loss",
    ],
    skipIfShort: "PPO section — DPO has largely replaced it; mention PPO is what RLHF originally used",
  },

  l51: {
    time: "75 min",
    difficulty: 3,
    commonErrors: [
      "Optimising F1 when the problem actually needs recall ≥ 0.99 (e.g. cancer screening)",
      "Using AUC-ROC for a dataset with 1:100 class imbalance — use AUC-PR instead",
      "Not calibrating model confidence — 70% predicted probability should mean 70% actual accuracy",
    ],
    talkingPoints: [
      "Always ask: what does a false negative cost vs. a false positive? This determines your operating threshold",
      "AUC-ROC = P(positive scores higher than negative) — this is its entire meaning",
      "Calibration is what separates a model you can trust from one you can only rank with",
    ],
    exercises: [
      "Given a confusion matrix, compute precision/recall/F1 by hand before checking with sklearn",
      "Plot the precision-recall curve and show what happens to AUC as you adjust the threshold",
    ],
    skipIfShort: "Calibration section — mention Platt scaling exists, skip the math",
  },

  l52: {
    time: "70 min",
    difficulty: 3,
    commonErrors: [
      "Trusting BLEU score for LLM evaluation — it is nearly useless for open-ended generation",
      "Not testing for benchmark contamination — high score ≠ generalization",
      "Using LLM-as-judge without validating against human judgments first",
    ],
    talkingPoints: [
      "Perplexity is the only metric that is truly model-internal and not task-dependent",
      "LLM-as-judge has known biases: it prefers longer responses and responses from similar models",
      "The best eval is: does the product make money? (business metric). Everything else is a proxy",
    ],
    exercises: [
      "Set up a simple LLM-as-judge eval: 10 pairs of responses, Claude judges which is better, compare to your own rankings",
      "Compute BLEU for two paraphrases that mean the same thing — show the score fails",
    ],
    skipIfShort: "ROUGE section — mention it is the standard for summarisation, skip the code",
  },

  l53: {
    time: "65 min",
    difficulty: 3,
    commonErrors: [
      "Doing grid search with 4+ hyperparameters — random search or Bayesian is always better",
      "Not using log scale for learning rate search — never search LR on a linear grid",
      "Tuning hyperparameters on the test set — this is data leakage; always use a validation set",
    ],
    talkingPoints: [
      "The learning rate is almost always the only HP you need to tune carefully",
      "Optuna's TPE is Bayesian optimisation that scales to 1000s of trials — use it in production",
      "Early stopping for HP search: kill trials that are clearly losing after 20% of training",
    ],
    exercises: [
      "Run Optuna on the fake_run simulator — show it finds the optimal config in 30 trials vs 100 for grid",
    ],
    skipIfShort: "Optuna advanced section (pruning, parallel) — just show the basic study.optimize() call",
  },

  l61: {
    time: "70 min",
    difficulty: 2,
    commonErrors: [
      "Not streaming — users hate waiting 8 seconds for the full response when they could see it after 150ms",
      "Putting the API key in the code — always use environment variables",
      "Not handling rate limit errors with exponential backoff — production apps will hit them",
    ],
    talkingPoints: [
      "The entire economics of your AI product lives in: input_tokens × input_price + output_tokens × output_price",
      "Prompt caching (Anthropic) can cut costs 90% for apps with repeated long system prompts",
      "Haiku handles 80% of use cases at 5% of Opus cost — build a routing layer",
    ],
    exercises: [
      "Write a streaming call, measure TTFT, and compute cost — feel the economics in real numbers",
      "Implement the retry-with-backoff wrapper and test it with a deliberately bad API key",
    ],
    skipIfShort: "Structured output section — mention it exists, direct students to the Anthropic docs",
  },

  l62: {
    time: "75 min",
    difficulty: 4,
    commonErrors: [
      "Not understanding why inference is memory-bandwidth bound — this is the core bottleneck",
      "Using fp32 for inference — fp16 or bf16 is always fine and 2× faster",
      "INT4 quantisation on a small (1B) model — quality degradation is noticeable; use INT8 instead",
    ],
    talkingPoints: [
      "The KV cache size grows linearly with sequence length — this is the real cost of long context",
      "Batching is the single most impactful optimisation for throughput — batch size 32 ≈ same cost as batch size 1",
      "vLLM's PagedAttention solves KV cache memory fragmentation — it is now the standard serving engine",
    ],
    exercises: [
      "Calculate: how much GPU memory does a 7B model need? At fp16? At INT4? What GPU fits each?",
      "Run the quantisation code — show INT8 error vs INT4 error on the same weights",
    ],
    skipIfShort: "Speculative decoding section — mention it halves latency, skip the implementation",
  },

  l63: {
    time: "70 min",
    difficulty: 3,
    commonErrors: [
      "Not versioning data alongside code — reproducing a training run requires both",
      "Using wandb without setting a project name — all runs go into one cluttered default project",
      "Not setting up model registry before needing to roll back — you will need to roll back",
    ],
    talkingPoints: [
      "The three killer failures: training-serving skew, silent degradation, irreproducible experiments",
      "DVC is git for data — it stores data hashes in git, data in S3. 5 commands, massive value",
      "Monitoring is not optional — model performance degrades silently in production",
    ],
    exercises: [
      "Set up a minimal wandb run that logs loss, grad_norm, and a sample prediction every 100 steps",
      "Simulate data drift: train on one distribution, evaluate on shifted distribution — watch metrics drop",
    ],
    skipIfShort: "CI/CD section — show the GitHub Actions YAML, explain what each step does, skip live demo",
  },

  l71: {
    time: "90 min",
    difficulty: 3,
    commonErrors: [
      "Chunking entire documents into one piece — always chunk into 300-500 token pieces with overlap",
      "Not choosing the right embedding model — voyage-3-large for retrieval, OpenAI for general use",
      "Using cosine similarity without normalising vectors — normalise first, then dot product = cosine sim",
    ],
    talkingPoints: [
      "RAG is the correct default for any knowledge-intensive task — fine-tuning is for style, not facts",
      "Chunk size is the single most impactful RAG parameter — 512 tokens with 50 overlap is a good start",
      "Hybrid retrieval (BM25 + dense) almost always beats either alone — use both when possible",
    ],
    exercises: [
      "Build a tiny RAG pipeline on 5 documents: embed, store, retrieve, generate — end to end in 30 lines",
      "Show retrieval failure: question about topic not in corpus — model should say 'I don't know'",
    ],
    skipIfShort: "Re-ranking section — mention cross-encoder rerankers improve quality 10-15%, skip code",
  },

  l72: {
    time: "85 min",
    difficulty: 4,
    commonErrors: [
      "Building an agent when a chain would work — chains are cheaper, faster, and more reliable",
      "Not handling tool call failures — agents must detect and recover from tool errors",
      "Infinite loops — always set a max_iterations limit",
    ],
    talkingPoints: [
      "The agent loop = LLM + tools + memory + control flow. That is the entire field of agents",
      "Each LLM call in an agent costs money and latency — minimise unnecessary calls",
      "Human-in-the-loop is not a weakness — it is the right design for any consequential action",
    ],
    exercises: [
      "Build a 2-tool agent: calculator + web search. Give it a question that needs both",
      "Deliberately trigger a tool error and show how the agent recovers (or doesn't, and why)",
    ],
    skipIfShort: "Multi-agent section — mention it, show one diagram, skip the implementation",
  },

  l73: {
    time: "80 min",
    difficulty: 3,
    commonErrors: [
      "Not testing prompts on a representative sample — 5 examples is not enough to validate",
      "XML tags only work well with Claude — don't assume they transfer to other models",
      "Putting instructions at the end of a long prompt — models attend more to early context",
    ],
    talkingPoints: [
      "Chain-of-thought works because it forces the model to 'show its work' before committing to an answer",
      "Prompt compression techniques (LLMLingua) can cut 3× token count with <5% quality loss",
      "Version your prompts like code — a random wording change can break production",
    ],
    exercises: [
      "Take a vague prompt, apply the escalation ladder — measure quality improvement at each step",
      "Test self-consistency: sample 5 responses to a math problem, take majority vote — compare to single sample",
    ],
    skipIfShort: "Prompt compression section — mention it exists, skip implementation",
  },

  l81: {
    time: "60 min",
    difficulty: 3,
    commonErrors: [
      "Reading every equation in the method section — most are implementation details, not key ideas",
      "Trusting the abstract for results — always read the limitations section",
      "Not checking if the code is released — most important papers now have public implementations",
    ],
    talkingPoints: [
      "70% of papers are incremental — learn to spot the 30% with a genuinely new idea quickly",
      "ArXiv → check author reputation → check citations in the first 2 months → read if it lands",
      "The Figure 1 / Table 1 pass: if you can't explain the main result in one sentence after looking at these, the paper probably isn't that important for practitioners",
    ],
    exercises: [
      "Read the Attention Is All You Need abstract + Figure 1 + Table 2 in 5 minutes — what is the core claim?",
      "Find 3 papers that cite LoRA — how many of their claims hold up?",
    ],
    skipIfShort: "Implementation checklist section — give as a reference handout, skip in class",
  },

  l82: {
    time: "55 min",
    difficulty: 2,
    commonErrors: [
      "Choosing a model based on benchmark leaderboards alone — always eval on your specific task",
      "Not considering latency requirements — Opus is 3× slower than Haiku",
      "Forgetting that open-weights models still require serving infrastructure",
    ],
    talkingPoints: [
      "The frontier moves every 3 months — the skill is navigating the landscape, not memorising it",
      "Open vs closed is a business decision as much as a technical one",
      "Cost per token is falling 40% per year — the economics of AI products will look completely different in 2 years",
    ],
    exercises: [
      "Design a model routing strategy for a hypothetical app: 80% simple queries → Haiku, 15% medium → Sonnet, 5% complex → Opus",
    ],
    skipIfShort: "Multimodal section — mention vision and audio capabilities exist, skip the API examples",
  },

  l83: {
    time: "120 min",
    difficulty: 4,
    commonErrors: [
      "Not defining the output schema upfront — structured output requires knowing what you want",
      "Passing the entire file to the LLM instead of chunking by function — expensive and often worse",
      "Not testing on real code — synthetic test cases miss the edge cases that matter",
    ],
    talkingPoints: [
      "This capstone uses every technique from the course — call them out as you encounter each one",
      "Structured output is the key insight — unstructured LLM output is hard to use programmatically",
      "This pattern (embed + retrieve + generate + structure) is the template for 80% of AI applications",
    ],
    exercises: [
      "Run the code reviewer on real Python code from their own projects — qualitative eval",
      "Extend it: add a 'fix suggestion' field to the CodeReview schema",
    ],
    skipIfShort: "The embedding + retrieval section — run with empty vector store, just the LLM reviewer",
  },

  l84: {
    time: "45 min",
    difficulty: 2,
    commonErrors: [
      "Students try to memorise every technique instead of internalising the one framework",
      "Forgetting that the architecture IS the choice of function family",
    ],
    talkingPoints: [
      "Every AI paper you will ever read is a variation on: θ* = argmin_θ E[L(f(x;θ), y)]",
      "Architecture = what functions are representable. Loss = what 'wrong' means. Optimizer = how we search",
      "The entire course in one sentence: choose a function family, choose a loss derived from your distributional assumption, and use gradient descent to find the best parameters",
    ],
    exercises: [
      "Open discussion: pick a problem. What architecture? What loss? What training data?",
      "Ask students: what from this course surprised you most?",
    ],
    skipIfShort: "Nothing — this is the closing synthesis. Give it its full 45 minutes",
  },

};
